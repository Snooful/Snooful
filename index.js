require("dotenv").config();

const log = require("./debug.js");

const version = require("./package.json").version;

const sqlite = require("sqlite");
const path = require("path");

const SettingsManager = require("./settings.js");
let settings = {};

sqlite.open(path.normalize("./settings.sqlite3")).then(database => {
	log.main("opened settings database");
	settings = new SettingsManager(database);
});

/**
 * The prefix required by commands to be considered by the bot.
 */
const prefix = process.env.SNOOFUL_PREFIX || "!";

const yargs = require("yargs");
yargs.commandDir("commands", {
	recurse: true,
});

/**
 * Logs an end user-initiated fail (non-interrupting) to console.
 * @param {*} error The error that occured.
 */
function safeFail(error) {
	  const errMsg = error instanceof Error ? error.message : error;
    return log.commands("an error occured during command parsing/execution: %s", errMsg);
}

yargs.fail(safeFail);
yargs.exitProcess(false);

yargs.help(false);
yargs.version(false);

/**
 * The client information.
 */
let client = {};

/**
 * Runs a command.
 * @param {string} command The command to run, including prefix.
 * @param {*} channel The channel the command was sent from.
 * @param {*} message The message representing the command.
 */
function handleCommand(command = "", channel = {}, message = {}) {
	if (command.startsWith(prefix) && message._sender.nickname !== client.nickname) {
		const unprefixedCmd = command.replace(prefix, "");
		log.commands("recieved command '%s'", unprefixedCmd);

		let chData = {};
		
		try {
			chData = JSON.parse(channel.data);
		} catch (error) {
			log.commands("couldn't parse extra channel data, this is fine");
		}

		try {
			yargs.parse(unprefixedCmd, {
				author: message._sender.nickname,
				chData,
				channel,
				client,
				log: log.commands,
				message,
				prefix,
				sb,
				settings: settings.subredditWrapper(channelSub(channel)),
				version,
				usage: yargs.getUsageInstance().getCommands(),
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

log.main("connecting to sendbird");
sb.connect(process.env.SNOOFUL_ID, process.env.SNOOFUL_TOKEN, (userInfo, error) => {
	if (error) {
		log.main("couldn't connect to sendbird");
	} else {
		log.main("connected to sendbird");
		client = userInfo;

		const query = sb.GroupChannel.createMyGroupChannelListQuery();
		query.next(list => {
			list.filter(channel => {
				return channel.myMemberState = "invited";
			}).forEach(channel => {
				channel.acceptInvitation((channel, error) => {
					if (!error) {
						log.invites(`accepted channel invitation to ${channel.name} (late)`);
						channel.sendUserMessage(`Thanks for inviting me to this channnel, u/${inviter.nickname}! Sorry I was late, but I'm u/${client.nickname}, your friendly bot asssistant, and you can do ${prefix}commands to get started.`, (message, error) => {
							log.invites(error ? "failed to send introductory message (late)" : "sent introductory message (late)");
						});
					}
				});
			});
		});
	}
});

const handler = new sb.ChannelHandler();

handler.onMessageReceived = (channel, message) => handleCommand(message.message, channel, message);
handler.onUserReceivedInvitation = (channel, inviter, invitees) => {
	if (invitees.map(invitee => invitee.nickname).includes(client.nickname)) {
		// I have been invited to channel, let's join and send an introductory message!
		log.invites("invited to channel");
		channel.acceptInvitation((channel, error) => {
			if (error) {
				log.invites("failed to accept channel invitation");
			} else {
				log.invites(`automatically accepted channel invitation to ${channel.name}`);
				channel.sendUserMessage(`Thanks for inviting me to this channnel, u/${inviter.nickname}! I'm u/${client.nickname}, your friendly bot asssistant, and you can do ${prefix}commands to get started.`, (message, error) => {
					log.invites(error ? "failed to send introductory message" : "sent introductory message");
				});
			}
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