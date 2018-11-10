const config = Object.assign({
	credentials: {},
	prefix: "!",
}, require("./config.json"));

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

const pify = require("./utils/promisify").sb;

const chance = new require("chance").Chance();
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
parser.registerDirectory("./commands");

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

		try {
			chData = JSON.parse(channel.data);
		} catch (error) {
			log.commands("couldn't parse extra channel data, this is fine");
		}

		const settingsWrapper = settings.subredditWrapper(channelSub(channel));

		try {
			parser.parse(unprefixedCmd, {
				author: message._sender.nickname,
				chData,
				channel,
				client,
				locales,
				localize: (key = "", ...formats) => {
					const lang = settingsWrapper.get("lang");

					const thisLocal = lang ? (locales[lang] || locales["en-US"]) : locales["en-US"];
					const msg = thisLocal[key] || locales["en-US"][key];

					if (msg) {
						const msgChosen = chanceFormats(msg);

						const formatted = format(msgChosen, ...formats);
						return lang === "uǝ" ? upsidedown(formatted) : formatted;
					} else {
						return undefined;
					}
				},
				log: log.commands,
				message,
				prefix,
				reddit,
				registry: parser.getCommandRegistry(),
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

function acceptInvitesLate() {
	const query = sb.GroupChannel.createMyGroupChannelListQuery();
	query.next(list => {
		list.filter(channel => {
			return channel.myMemberState = "invited";
		}).forEach(channel => {
			pify(channel.acceptInvitation.bind(channel)).then(() => {
				log.invites(`accepted channel invitation to ${channel.name} (late)`);
			});
		});
	});
}

const reddit = new Snoowrap(Object.assign(config.credentials, {
	userAgent: `Snooful v${version}`,
}));

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
	pify(sb.connect.bind(sb), "t2_" + id, sbInfo.sb_access_token).then(userInfo => {
		log.main("connected to sendbird");
		client = userInfo;

		acceptInvitesLate();
	}).catch(() => {
		log.main("couldn't connect to sendbird");
	});
}
launch();

const handler = new sb.ChannelHandler();

handler.onMessageReceived = (channel, message) => handleCommand(message.message, channel, message);
handler.onUserReceivedInvitation = (channel, inviter, invitees) => {
	if (invitees.map(invitee => invitee.nickname).includes(client.nickname)) {
		// I have been invited to channel, let's join and send an introductory message!
		log.invites("invited to channel");
		pify(channel.acceptInvitation.bind(channel)).then(() => {
			log.invites(`automatically accepted channel invitation to ${channel.name}`);
			pify(channel.sendUserMessage.bind(channel), [
				`Thanks for inviting me to this channnel, u/${inviter.nickname}!`,
				`I'm u/${client.nickname}, your friendly bot asssistant,`,
				`and you can do ${prefix}commands to get started.`,
			].join(" ")).then(() => {
				log.invites("sent introductory message");
			}).catch(() => {
				log.invites("failed to send introductory message");
			});
		}).catch(() => {
			log.invites("failed to accept channel invitation");
		});
	}
};

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
		pify(channel.sendUserMessage.bind(channel), settings.get(sub, "join_message").replace(/{USER}/g, user.nickname)).then(() => {
			log.gateway("sent join message");
		}).catch(() => {
			log.gateway("failed to send join message");
		});
	}
};
handler.onUserLeft = (channel, user) => {
	if (user.nickname === client.nickname) return;

	log.gateway("user left, handling leave message");

	const sub = channelSub(channel);
	if (settings.get(sub, "leave_message") !== undefined) {
		pify(channel.sendUserMessage.bind(channel), settings.get(sub, "leave_message").replace(/{USER}/g, user.nickname)).then(() => {
			log.gateway("sent leave message");
		}).catch(() => {
			log.gateway("failed to send leave message");
		});
	}
};

sb.addChannelHandler("handler", handler);