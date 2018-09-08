module.exports = {
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
	builder: build => {
		build.positional("join-message", {
			describe: "The new join message.",
			type: "string",
		});
	},
	command: "setjoinmessage [join-message]",
	describe: "Sets the message for channel joiners. {USER} is replaced with the user's name.",
	handler: args => {
		if (args.joinMessage) {
			args.settings.set("join_message", args.joinMessage);
			args.send(args.localize("update_join_message"));
		} else {
			args.settings.clear("join_message");
			args.send(args.localize("clear_join_message"));
		}
	},
};