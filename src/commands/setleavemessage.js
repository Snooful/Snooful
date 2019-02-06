const ems = require("./../utils/event-message-setter.js");

module.exports = ems("setleavemessage", {
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
});