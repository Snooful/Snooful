const { version } = require("../package.json");

const Snoowrap = require("snoowrap");

// Utilities
const log = require("./utils/debug.js");
const pify = require("./utils/promisify");
const channelSub = require("./utils/channel-sub.js");
const unprefixCommand = require("./utils/unprefix-command.js");
const eventMessageFactory = require("./utils/event-messages/handler.js");

const getSettingsManager = require("./utils/get-settings-manager.js");

const parser = require("@snooful/orangered-parser");
const creq = require("clear-module");

/**
 * Reloads the commands.
 */
function reload() {
	parser.clear();
	creq.all();
	parser.registerDirectory("./src/commands");
}
reload();

/**
 * Logs an error to console.
 * @param {*} error The error that occurred.
 * @returns {string} The error message.
 */
function safeFail(error) {
	const errMsg = error instanceof Error ? error.message : error;
	log.main("an error occurred: %s", errMsg);
	return errMsg;
}
process.on("unhandledRejection", safeFail);
process.on("unhandledException", safeFail);

const locales = require("./utils/localization/get-locales.js")();
const localize = require("./utils/localization/localize.js");

const pp = require("@snooful/periwinkle-permissions");
const userPerms = require("./utils/user-perms.js");

const Sendbird = require("sendbird");

const FormData = require("form-data");
const { CookieJar } = require("tough-cookie");

const got = require("got");

class Snooful {
	constructor(config) {
		if (typeof config !== "object" || config == null) {
			throw new TypeError("A config must be supplied");
		}
		this.config = config;

		/**
		 * The prefix required by commands to be considered by the bot.
		 * @type {Object}
		 */
		this.prefix = config.prefix;

		this.settings = getSettingsManager(config.settingsManager);

		this.reddit = new Snoowrap(Object.assign(config.credentials, {
			userAgent: `Snooful v${version}`,
		}));

		this.sendbird = new Sendbird({
			appId: "2515BDA8-9D3A-47CF-9325-330BC37ADA13",
		});

		// Use error-first callbacks, like every other library does
		this.sendbird.setErrorFirstCallback(true);

		/**
		 * The client information.
		 */
		this.client = {};
	}

	async getSessionToken(form) {
		const response = await got.post({
			body: form,
			responseType: "json",
			url: "https://ssl.reddit.com/api/login",
		});
		return response.body.json.data.cookie;
	}

	/**
	 * Grabs a new access token and connects to Sendbird.
	 */
	async launch() {
		if (!this.settings) return;
		log.settings("passing off settings handling to the '%s' module", this.settings.constructor.name);

		const form = new FormData();
		form.append("user", this.config.credentials.username);
		form.append("passwd", this.config.credentials.password);
		form.append("api_type", "json");

		log.settings("initializing settings manager");
		await this.settings.init().catch(() => {
			log.settings("failed to initialize the settings manager");
			throw new Error("Failed to initialize the settings manager");
		});

		log.main("fetching session token");
		const sessionToken = await this.getSessionToken(form).catch(() => {
			log.main("could not get session token");
			throw new Error("Could not get session token");
		});
		const cookieJar = new CookieJar();
		cookieJar.setCookieSync("reddit_session=" + encodeURIComponent(sessionToken), "https://s.reddit.com");

		// Fetch our access token.
		log.main("fetching new access token");
		const sbResponse = await got({
			cookieJar,
			method: "get",
			responseType: "json",
			url: "https://s.reddit.com/api/v1/sendbird/me",
		}).catch(() => {
			log.main("could not get access token");
			throw new Error("Could not get access token");
		});
		const sbInfo = sbResponse.body;

		// Get our Reddit user ID
		log.main("getting id");
		const id = await this.reddit.getMe().id.catch(() => {
			log.main("could not get user id");
			throw new Error("Could not get user ID");
		});

		// We have both necessary values, so let's connect to Sendbird!
		log.main("connecting to sendbird");
		const userInfo = await pify(this.sendbird.connect.bind(this.sendbird), "t2_" + id, sbInfo.sb_access_token).catch(() => {
			log.main("could not connect to sendbird");
			throw new Error("Could not connect to Sendbird");
		});

		// We did it! Let's store the user info in a higher scope.
		log.main("connected to sendbird");
		this.client = userInfo;

		// Let's catch up on the invites we might've missed while offline.
		this.acceptLateInvites();

		this.addChannelHandlers();
	}

	/**
	 * Accepts invites to all channels with pending invitations.
	 */
	acceptLateInvites() {
		// Query for group channels
		const query = this.sendbird.GroupChannel.createMyGroupChannelListQuery();
		pify(query.next.bind(query)).then(list => {
			// Accept the invites!
			list.filter(channel => {
				return channel.myMemberState === "invited";
			}).forEach(channel => {
				pify(channel.acceptInvitation.bind(channel)).then(() => {
					log.invites("accepted late channel invitation to '%s'", channel.name);
				}).catch(() => {
					log.invites("failed to accept late channel invitation to '%s'", channel.name);
				});
			});
		}).catch(() => {
			log.invites("failed to get list of channels to accept late invites");
		});
	}

	handleInvite(channel, inviter, invitees) {
		if (invitees.some(invitee => invitee.nickname === this.client.nickname)) {
			// I have been invited to a channel.
			log.invites("invited to channel");

			// Let's join!
			pify(channel.acceptInvitation.bind(channel)).then(() => {
				log.invites(`automatically accepted channel invitation to ${channel.name}`);

				// Now that we've joined, let's send our introductory message!
				pify(channel.sendUserMessage.bind(channel), localize("en-US", "invite_message", {
					inviter: inviter.nickname,
					me: this.client.nickname,
					prefix: this.prefix.start,
				})).then(() => {
					log.invites("sent introductory message");
				}).catch(() => {
					log.invites("failed to send introductory message");
				});
			}).catch(() => {
				log.invites("failed to accept channel invitation");
			});
		}
	}

	addChannelHandlers() {
		const handler = new this.sendbird.ChannelHandler();

		handler.onMessageReceived = (channel, message) => this.handleCommand(message.message, channel, message);
		handler.onUserReceivedInvitation = (channel, inviter, invitees) => this.handleInvite(channel, inviter, invitees);

		handler.onUserJoined = eventMessageFactory("join", "➡️", this.settings, () => this.client.nickname);
		handler.onUserLeft = eventMessageFactory("leave", "🚪", this.settings, () => this.client.nickname);
		handler.onUserBanned = eventMessageFactory("ban", "🔨", this.settings, () => this.client.nickname);

		this.sendbird.addChannelHandler("handler", handler);
	}

	/**
	 * Gets the JSON data of a channel.
	 * @param {*} channel The channel to get the data from.
	 * @returns {Object} The parsed data.
	 */
	getChannelData(channel) {
		if (channel.data) {
			try {
				return {
					parsable: true,
					...JSON.parse(channel.data),
				};
			} catch (error) {
				return {
					parsable: false,
				};
			}
		}
	}

	/**
	 * Runs a command.
	 * @param {string} command The command to run, including prefix.
	 * @param {*} channel The channel the command was sent from.
	 * @param {*} message The message representing the command.
	 */
	handleCommand(command = "", channel = {}, message = {}) {
		if (message._sender.nickname === this.client.nickname && !this.config.selfBot) return;

		const unprefixed = unprefixCommand(command, this.prefix);
		if (unprefixed === null) return;
		const {
			unprefixedCmd,
			usedPrefixType,
		} = unprefixed;

		log.commands("recieved command '%s' from '%s' channel", unprefixedCmd, channel.name);

		const chData = this.getChannelData(channel);
		const settingsWrapper = this.settings.createWrapper(channelSub(channel));

		const author = message.sender.nickname;

		if (!settingsWrapper.get("roles")) {
			settingsWrapper.set("roles", {});
		}
		const perms = userPerms(author, settingsWrapper.get("roles"));

		try {
			parser.parse(unprefixedCmd, {
				chData,
				channel,
				client: this.client,
				locales,
				/**
				 * Formats a string based on the set language of the subreddit/DM.
				 * @param {...any} args Arguments to pass to the localizer.
				 * @returns {*} The formatted localization based on the set language of the subreddit/DM.
				 */
				localize: (...args) => {
					return localize(settingsWrapper.get("lang"), ...args);
				},
				localizeO: localize,
				log: log.commands,
				message,
				perms,
				reddit: this.reddit,
				registry: parser.getCommandRegistry(),
				reload,
				sb: this.sendbird,
				send: content => {
					return new Promise((resolve, reject) => {
						const callback = (error, sentMessage) => {
							if (error) {
								reject(error);
							} else {
								resolve(sentMessage);
							}
						};

						if (message._sender.nickname === this.client.nickname) {
							channel.updateUserMessage(message.messageId, message.message + "\n\n" + content.toString(), null, null, callback);
						} else {
							channel.sendUserMessage(content.toString(), callback);
						}
					});
				},
				sender: message.sender,
				settings: settingsWrapper,
				testPermission: perm => {
					if (chData.subreddit) {
						// Mods have all permissions
						const mods = settingsWrapper.get("mods");
						if (mods && mods.includes(author)) {
							return true;
						} else {
							return pp.test(perm, perms, true);
						}
					}

					// If it's not a subreddit, don't give it permissions
					return true;
				},
				usedPrefix: this.prefix[usedPrefixType],
				usedPrefixType,
				version,
			});
		} catch (error) {
			safeFail(error);
		}
	}
}
module.exports = Snooful;
