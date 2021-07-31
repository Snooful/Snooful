const eventMessageSetter = require("../../utils/event-messages/setter.js");

module.exports = eventMessageSetter("setjoinmessage", {
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
		category: "eventmessage",
		description: "Sets the message announced after a user joins.",
	},
	longDescription: "Sets the message that is sent when a user joins the channel.",
	msgType: "join_message",
	storageKey: "join_message",
});
