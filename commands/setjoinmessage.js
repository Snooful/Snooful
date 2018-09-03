module.exports = {
	command: "setjoinmessage [join-message]",
	describe: "Sets the message for channel joiners. {USER} is replaced with the user's name.",
	aliases: [
		"joinmessage",
		"setjoinmsg",
		"joinmsg",
	],
	builder: build => {
		build.positional("join-message", {
			describe: "The new join message.",
			type: "string",
		});
	},
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