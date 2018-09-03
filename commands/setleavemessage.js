module.exports = {
	command: "setleavemessage [leave-message]",
	describe: "Sets the message for channel leavers. {USER} is replaced with the user's name.",
	aliases: [
		"leavemessage",
		"setleavemsg",
		"leavemsg",
	],
	builder: build => {
		build.positional("leave-message", {
			describe: "The new leave message.",
			type: "string",
		});
	},
	handler: args => {
		if (args.leaveMessage) {
			args.settings.set("leave_message", args.leaveMessage);
			args.send("The leave message has been updated.");
		} else {
			args.settings.clear("leave_message");
			args.send("The leave message will not be sent.");
		}
	}
};