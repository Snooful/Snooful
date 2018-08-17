module.exports = {
	command: "setleavemessage <message>",
	describe: "Sets the message for channel leavers. {USER} is replaced with the user's name.",
	handler: args => {
		if (args.message) {
			args.settings.set("leave_message", args.message);
			args.send("The leave message has been updated.");
		} else {
			args.settings.clear("leave_message");
			args.send("The leave message will not be sent.");
		}
	}
};