const ems = require("./../../utils/event-message-setter.js");

module.exports = ems("setleavemessage", {
	category: "eventmessage",
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
		description: "Sets the message announced after a user leaves.",
	},
	longDescription: "Sets the message that is sent when a user leaves the channel.",
	msgType: "leave_message",
	storageKey: "leave_message",
});