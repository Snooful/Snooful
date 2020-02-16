const ems = require("./../../utils/event-message-setter.js");

module.exports = ems("setbanmessage", {
	command: {
		aliases: [
			"banmessage",
			"setbanmsg",
			"banmsg",
		],
		category: "eventmessage",
		description: "Sets the message announced after a user is banned.",
	},
	longDescription: "Sets the message that is sent when a user is banned from a channel.",
	msgType: "ban_message",
	storageKey: "ban_message",
});