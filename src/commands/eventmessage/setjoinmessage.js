const ems = require("./../../utils/event-message-setter.js");

module.exports = ems("setjoinmessage", {
	category: "eventmessage",
	command: {
		aliases: [
			"joinmessage",
			"setjoinmsg",
			"joinmsg",
			"setwelcomemessage",
			"welcomemessage",
			"setwelcomemsg",
			"welcomemsg",
			"sethellomessage",
			"hellomessage",
			"sethellomsg",
			"hellomsg",
		],
		description: "Sets the message announced after a user joins.",
	},
	longDescription: "Sets the message that is sent when a user joins the channel.",
	msgType: "join_message",
	storageKey: "join_message",
});