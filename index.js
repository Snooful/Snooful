const config = {
	credentials: {},
	prefix: "!",
	...require("./config.json"),
};

const Snoowrap = require("snoowrap");

const log = require("./debug.js");

const version = require("./package.json").version;

const sqlite = require("sqlite");
const path = require("path");

const SettingsManager = require("./settings.js");
let settings = {};

const locales = require("./locales.json");
const format = require("string-format");
const upsidedown = require("upsidedown");

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

sqlite.open(path.normalize("./settings.sqlite3")).then(database => {
	log.main("opened settings database");
	settings = new SettingsManager(database);
});

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
	const query = sb.GroupChannel.createMyGroupChannelListQuery();
	query.next(list => {
		list.filter(channel => {
			return channel.myMemberState = "invited";
		}).forEach(channel => {
			channel.acceptInvitation((_, acceptError) => {
				if (!acceptError) {
					log.invites(`accepted channel invitation to ${channel.name} (late)`);
				}
			});
		});
	});
}

const reddit = new Snoowrap(Object.assign(config.credentials, {
	userAgent: `Snooful v${version}`,
}));

/**
 * Grabs a new access token and connects to Sendbird.
 */
async function launch() {
	log.main("fetching new access token");
	const sbInfo = await reddit.oauthRequest({
		baseUrl: "https://s.reddit.com/api/v1",
		method: "get",
		uri: "/sendbird/me",
	}).catch(() => {
		log.main("could not get access token");
	});

	log.main("getting id");
	const id = await reddit.getMe().id.catch(() => {
		log.main("could not get id");
	});

	log.main("connecting to sendbird");
	sb.connect("t2_" + id, sbInfo.sb_access_token, (userInfo, error) => {
		if (error) {
			log.main("couldn't connect to sendbird");
		} else {
			log.main("connected to sendbird");
			client = userInfo;

			acceptInvitesLate();
		}
	});
}
launch();

const handler = new sb.ChannelHandler();

handler.onMessageReceived = (channel, message) => handleCommand(message.message, channel, message);
handler.onUserReceivedInvitation = (channel, inviter, invitees) => {
	if (invitees.map(invitee => invitee.nickname).includes(client.nickname)) {
		// I have been invited to channel, let's join and send an introductory message!
		log.invites("invited to channel");
		channel.acceptInvitation((inviteChannel, error) => {
			if (error) {
				log.invites("failed to accept channel invitation");
			} else {
				log.invites(`automatically accepted channel invitation to ${channel.name}`);
				channel.sendUserMessage(localize("en-US", "invite_message", {
					inviter: inviter.nickname,
					me: client.nickname,
					prefix,
				}), (message, sendError) => {
					log.invites(sendError ? "failed to send introductory message" : "sent introductory message");
				});
			}
		});
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

handler.onUserJoined = (channel, user) => {
	if (user.nickname === client.nickname) return;

	log.gateway("user joined, handling join message");

	const sub = channelSub(channel);
	if (settings.get(sub, "join_message") !== undefined) {
		channel.sendUserMessage(settings.get(sub, "join_message").replace(/{USER}/g, user.nickname), (message, error) => {
			log.gateway(error ? "failed to send join message" : "sent join message");
		});
	}
};
handler.onUserLeft = (channel, user) => {
	if (user.nickname === client.nickname) return;

	log.gateway("user left, handling leave message");

	const sub = channelSub(channel);
	if (settings.get(sub, "leave_message") !== undefined) {
		channel.sendUserMessage(settings.get(sub, "leave_message").replace(/{USER}/g, user.nickname), (message, error) => {
			log.gateway(error ? "failed to send leave message" : "sent leave message");
		});
	}
};

sb.addChannelHandler("handler", handler);