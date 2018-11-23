module.exports = {
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
	builder: [{
		describe: "The new leave message.",
		key: "leave-message",
		type: "string",
	}],
	description: "Sets the message for channel leavers. {USER} is replaced with the user's name.",
	handler: args => {
		const oldMsg = args.settings.get("join_message");
		if (args.leaveMessage) {
			if (oldMsg === args.leaveMessage) {
				args.send(args.localize("update_leave_message_no_change"));
			} else {
				args.settings.set("leave_message", args.leaveMessage);
				args.send(args.localize("update_leave_message"));
			}
		} else if (oldMsg === undefined) {
			args.send(args.localize("clear_leave_message_no_change"));
		} else {
			args.settings.clear("leave_message");
			args.send(args.localize("clear_leave_message"));
		}
	},
	name: "setleavemessage",
};