module.exports = {
	command: "setjoinmessage <joinMessage>",
	describe: "Sets the message for channel joiners. {USER} is replaced with the user's name.",
	handler: args => {
		if (args.joinMessage) {
			args.settings.set("join_message", args.joinMessage);
			args.send("The join message has been updated.");
		} else {
			args.settings.clear("join_message");
			args.send("The join message will not be sent.");
		}
	}
};