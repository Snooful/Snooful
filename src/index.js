const { version } = require("./../package.json");

const cosmic = require("cosmiconfig");
const explorer = cosmic("snooful", {
	searchPlaces: [
		"package.json",
		"config.json",
		".snoofulrc",
		".snoofulrc.json",
		".snoofulrc.yaml",
		".snoofulrc.yml",
		".snoofulrc.js",
		"snooful.config.js",
	],
	transform: result => ({
		credentials: {},
		prefix: "!",
		settingsManager: "@snooful/sqlite-settings",
		...result.config,
	}),
});
const config = explorer.searchSync();

const Snoowrap = require("snoowrap");

// Utilities
const log = require("./utils/debug.js");
const pify = require("./utils/promisify");
const channelSub = require("./utils/channel-sub.js");
const eventMessageFactory = require("./utils/event-message-handler.js");

const path = require("path");

let setMan = {};
try {
	setMan = require(config.settingsManager);
} catch (error) {
	if (error instanceof SyntaxError) {
		return log.settings("could not load the settings manager module due to a syntax error");
	} else if (error.code === "MODULE_NOT_FOUND") {
		return log.settings("could not find a settings manager module with the id '%s'", config.settingsManager);
	} else {
		return log.settings("could not load the settings manager module (error code '%s', message '%s')", error.code, error.message);
	}
}

// Set up in a way where legacy settings managers work too
const SettingsManager = setMan.SettingsManager || setMan;
const extension = setMan.extension || "";

const init = SettingsManager.prototype.init;
SettingsManager.prototype.init = () => {
	return false;
};

log.settings("passing off settings handling to the '%s' module", config.settingsManager);
const settings = new SettingsManager(path.resolve("./settings" + extension));
init.call(settings);

const locales = require("./locales.json");
const format = require("string-format");
const upsidedown = require("upsidedown");

const chance = new require("chance").Chance();
/**
 * Selects a string.
 * @param {(Object|any[]|*)} msg If an object, selects an key based on the weight value. If an array, picks a random element. Otherwise, converts to a string.
 */
function chanceFormats(msg) {
	if (Array.isArray(msg)) {
		return chance.pickone(msg);
	} else if (msg instanceof Object) {
		return chance.weighted(Object.keys(msg), Object.values(msg));
	} else {
		return msg.toString();
	}
}

/**
 * The prefix required by commands to be considered by the bot.
 */
const prefix = config.prefix || "!";

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

/**
 * The client information.
 */
let client = {};

/**
 * Formats a string.
 * @param {string} lang A language code. If the key is not localized in this language or this value is not provided, uses en-US.
 * @param {string} key The key to localize.
 * @param {...any} formats The values to provide for placeholders.
 * @return {?string} A string if a localization could be provided, or null.
 */
function localize(lang = "en-US", key = "", ...formats) {
	const thisLocal = lang ? (locales[lang] || locales["en-US"]) : locales["en-US"];
	const msg = thisLocal[key] || locales["en-US"][key];

	if (msg) {
		const msgChosen = chanceFormats(msg);

		const formatted = format(msgChosen, ...formats);
		return lang === "uǝ" ? upsidedown(formatted) : formatted;
	} else {
		return null;
	}
}

const pp = require("@snooful/periwinkle-permissions");
const userPerms = require("./utils/user-perms.js");

/**
 * Runs a command.
 * @param {string} command The command to run, including prefix.
 * @param {*} channel The channel the command was sent from.
 * @param {*} message The message representing the command.
 * @returns {undefined} Nothing is returned.
 */
function handleCommand(command = "", channel = {}, message = {}) {
	if (command.startsWith(prefix) && message._sender.nickname !== client.nickname) {
		const unprefixedCmd = command.replace(prefix, "");
		log.commands("recieved command '%s' from '%s' channel", unprefixedCmd, channel.name);

		let chData = {
			parsable: null,
		};
		if (channel.data) {
			try {
				chData = {
					parsable: true,
					...JSON.parse(channel.data),
				};
			} catch (error) {
				chData = {
					parsable: false,
				};
			}
		}

		const settingsWrapper = settings.subredditWrapper(channelSub(channel));

		const author = message._sender.nickname;

		if (!settingsWrapper.get("roles")) {
			settingsWrapper.set("roles", {});
		}
		const perms = userPerms(author, settingsWrapper.get("roles"));

		try {
			parser.parse(unprefixedCmd, {
				author,
				chData,
				channel,
				client,
				locales,
				/**
				 * Formats a string based on the set language of the subreddit/DM.
				 */
				localize: (...args) => {
					return localize(settingsWrapper.get("lang"), ...args);
				},
				localizeO: localize,
				log: log.commands,
				message,
				perms,
				prefix,
				reddit,
				registry: parser.getCommandRegistry(),
				reload,
				sb,
				send: content => {
					return new Promise((resolve, reject) => {
						channel.sendUserMessage(content.toString(), (error, sentMessage) => {
							if (error) {
								reject(error);
							} else {
								resolve(sentMessage);
							}
						});
					});
				},
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
				version,
			});
		} catch (error) {
			safeFail(error);
		}
	}
}

const Sendbird = require("sendbird");
const sb = new Sendbird({
	appId: "2515BDA8-9D3A-47CF-9325-330BC37ADA13",
});

// Use error-first callbacks, like every other library does
sb.setErrorFirstCallback(true);

/**
 * Accepts invites to all channels with pending invitations.
 */
function acceptInvitesLate() {
	// Query for group channels
	const query = sb.GroupChannel.createMyGroupChannelListQuery();
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

const reddit = new Snoowrap(Object.assign(config.credentials, {
	userAgent: `Snooful v${version}`,
}));

const FormData = require("form-data");
const { CookieJar } = require("tough-cookie");

const got = require("got");

/**
 * Grabs a new access token and connects to Sendbird.
 */
function launch() {
	const form = new FormData();
	form.append("user", config.credentials.username);
	form.append("passwd", config.credentials.password);
	form.append("api_type", "json");

	log.main("fetching session token");
	got.post({
		body: form,
		url: "https://ssl.reddit.com/api/login",
	}).then(res => {
		const cookieJar = new CookieJar();
		cookieJar.setCookieSync("reddit_session=" + encodeURIComponent(JSON.parse(res.body).json.data.cookie), "https://s.reddit.com");

		// Fetch our access token.
		log.main("fetching new access token");
		got({
			cookieJar,
			method: "get",
			url: "https://s.reddit.com/api/v1/sendbird/me",
		}).then(sbRes => {
			const sbInfo = JSON.parse(sbRes.body);

			// Get our Reddit user ID
			log.main("getting id");
			reddit.getMe().id.then(id => {
				// We have both necessary values, so let's connect to Sendbird!
				log.main("connecting to sendbird");
				pify(sb.connect.bind(sb), "t2_" + id, sbInfo.sb_access_token).then(userInfo => {
					// We did it! Let's store the user info in a higher scope.
					log.main("connected to sendbird");
					client = userInfo;

					// Let's catch up on the invites we might've missed while offline.
					acceptInvitesLate();
				}).catch(() => {
					log.main("couldn't connect to sendbird");
				});
			}).catch(() => {
				log.main("could not get id");
			});
		}).catch(() => {
			log.main("could not get access token");
		});
	}).catch(() => {
		log.main("could not get session token");
	});
}
launch();

const handler = new sb.ChannelHandler();

handler.onMessageReceived = (channel, message) => handleCommand(message.message, channel, message);
handler.onUserReceivedInvitation = (channel, inviter, invitees) => {
	if (invitees.map(invitee => invitee.nickname).includes(client.nickname)) {
		// I have been invited to a channel.
		log.invites("invited to channel");

		// Let's join!
		pify(channel.acceptInvitation.bind(channel)).then(() => {
			log.invites(`automatically accepted channel invitation to ${channel.name}`);

			// Now that we've joined, let's send our introductory message!
			pify(channel.sendUserMessage.bind(channel), channel.sendUserMessage(localize("en-US", "invite_message", {
				inviter: inviter.nickname,
				me: client.nickname,
				prefix,
			}))).then(() => {
				log.invites("sent introductory message");
			}).catch(() => {
				log.invites("failed to send introductory message");
			});
		}).catch(() => {
			log.invites("failed to accept channel invitation");
		});
	}
};

handler.onUserJoined = eventMessageFactory("join", settings, client.nickname);
handler.onUserLeft = eventMessageFactory("leave", settings, client.nickname);

sb.addChannelHandler("handler", handler);
