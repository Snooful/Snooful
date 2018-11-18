const config = {
	credentials: {},
	prefix: "!",
	settingsManager: "",
	...require("./config.json"),
};

const Snoowrap = require("snoowrap");

const log = require("./debug.js");

const version = require("./package.json").version;

const path = require("path");

const { SettingsManager, extension } = require(config.settingsManager);
const settings = new SettingsManager(path.resolve("./settings" + extension));

const locales = require("./locales.json");
const format = require("string-format");
const upsidedown = require("upsidedown");

const pify = require("./utils/promisify").sb;

const chance = new require("chance").Chance();
/**
 * Selects a string.
 * @param {(object|*[]|*)} msg If an object, selects an key based on the weight value. If an array, picks a random element. Otherwise, converts to a string.
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
const creq = require("clear-require");

/**
 * Reloads the commands.
 */
function reload() {
	parser.clear();
	creq.all();
	parser.registerDirectory("./commands");
}
reload();

/**
 * Logs an end user-initiated fail (non-interrupting) to console.
 * @param {*} error The error that occured.
 * @returns {undefined} Nothing is returned.
 */
function safeFail(error) {
	const errMsg = error instanceof Error ? error.message : error;
	log.commands("an error occured during command parsing/execution: %s", errMsg);
}

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

		let chData = {};
		if (channel.data) {
			try {
				chData = JSON.parse(channel.data);
			} catch (error) {
				log.commands("couldn't parse extra channel data, this is fine");
			}
		}

		const settingsWrapper = settings.subredditWrapper(channelSub(channel));

		try {
			parser.parse(unprefixedCmd, {
				author: message._sender.nickname,
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
				prefix,
				reddit,
				registry: parser.getCommandRegistry(),
				reload,
				sb,
				send: content => {
					return new Promise((resolve, reject) => {
						channel.sendUserMessage(content.toString(), (sentMessage, error) => {
							if (error) {
								reject(error);
							} else {
								resolve(sentMessage);
							}
						});
					});
				},
				settings: settingsWrapper,
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

/**
 * Accepts invites to all channels with pending invitations.
 */
function acceptInvitesLate() {
	try {
		const query = sb.GroupChannel.createMyGroupChannelListQuery();
		query.next(list => {
			list.filter(channel => {
				return channel.myMemberState = "invited";
			}).forEach(async channel => {
				await pify(channel.acceptInvitation.bind(channel)).catch(() => {
					log.invites("failed to accept late channel invitation to '%s'", channel.name);
				});
				log.invites("accepted late channel invitation to '%s'", channel.name);
			});
		});
	} catch (error) {
		log.invites("an error occured while trying to accept late channel invitations: %O", error);
	}
}

const reddit = new Snoowrap(Object.assign(config.credentials, {
	userAgent: `Snooful v${version}`,
}));

/**
 * Grabs a new access token and connects to Sendbird.
 */
async function launch() {
	// Fetch our access token.
	log.main("fetching new access token");
	const sbInfo = await reddit.oauthRequest({
		baseUrl: "https://s.reddit.com/api/v1",
		method: "get",
		uri: "/sendbird/me",
	}).catch(() => {
		log.main("could not get access token");
	});

	// Get our Reddit user ID
	log.main("getting id");
	const id = await reddit.getMe().id.catch(() => {
		log.main("could not get id");
	});

	// We have both necessary values, so let's connect to Sendbird!
	log.main("connecting to sendbird");
	const userInfo = pify(sb.connect.bind(sb), "t2_" + id, sbInfo.sb_access_token).catch(() => {
		log.main("couldn't connect to sendbird");
	});

	// We did it! Let's store the user info in a higher scope.
	log.main("connected to sendbird");
	client = userInfo;

	// Let's catch up on the invites we might've missed while offline.
	acceptInvitesLate();
}
launch();

const handler = new sb.ChannelHandler();

handler.onMessageReceived = (channel, message) => handleCommand(message.message, channel, message);
handler.onUserReceivedInvitation = async (channel, inviter, invitees) => {
	if (invitees.map(invitee => invitee.nickname).includes(client.nickname)) {
		// I have been invited to a channel.
		log.invites("invited to channel");

		// Let's join!
		await pify(channel.acceptInvitation.bind(channel)).catch(() => {
			log.invites("failed to accept channel invitation");
		});
		log.invites(`automatically accepted channel invitation to ${channel.name}`);

		// Now that we've joined, let's send our introductory message!
		pify(channel.sendUserMessage.bind(channel), channel.sendUserMessage(localize("en-US", "invite_message", {
			inviter: inviter.nickname,
			me: client.nickname,
			prefix,
		}))).catch(() => {
			log.invites("failed to send introductory message");
		});
		log.invites("sent introductory message");
	}
};

/**
 * Gets the subreddit from a channel.
 * @param {*} channel The channel to get the subreddit from.
*/
function channelSub(channel) {
	if (channel.data) {
		const data = JSON.parse(channel.data);
		return data.subreddit ? data.subreddit.name : channel.url;
	} else {
		return channel.url;
	}
}

handler.onUserJoined = async (channel, user) => {
	if (user.nickname === client.nickname) return;

	log.gateway("user joined, handling join message");

	const sub = channelSub(channel);
	if (settings.get(sub, "join_message") !== undefined) {
		await pify(channel.sendUserMessage.bind(channel), settings.get(sub, "join_message").replace(/{USER}/g, user.nickname)).catch(() => {
			log.gateway("failed to send join message");
		});
		log.gateway("sent join message");
	}
};
handler.onUserLeft = async (channel, user) => {
	if (user.nickname === client.nickname) return;

	log.gateway("user left, handling leave message");

	const sub = channelSub(channel);
	if (settings.get(sub, "leave_message") !== undefined) {
		await pify(channel.sendUserMessage.bind(channel), settings.get(sub, "leave_message").replace(/{USER}/g, user.nickname)).catch(() => {
			log.gateway("failed to send leave message");
		});
		log.gateway("sent leave message");
	}
};

sb.addChannelHandler("handler", handler);