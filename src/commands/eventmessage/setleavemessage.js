const eventMessageSetter = require("../../utils/event-messages/setter.js");

module.exports = eventMessageSetter("setleavemessage", {
	command: {
		aliases: [
			"leavemessage",
			"setleavemsg",
			"leavemsg",
			"setquitmessage",
			"quitmessage",
			"setquitmsg",
			"quitmsg",
			"setgoodbyemessage",
			"goodbyemessage",
			"setgoodbyemsg",
			"goodbyemsg",
			"setbyemessage",
			"byemessage",
			"setbyemsg",
			"byemsg",
		],
		category: "eventmessage",
		description: "Sets the message announced after a user leaves.",
	},
	longDescription: "Sets the message that is sent when a user leaves the channel.",
	msgType: "leave_message",
	storageKey: "leave_message",
});
