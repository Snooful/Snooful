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
	arguments: [{
		description: "The new join message.",
		key: "join-message",
		type: "string",
	}],
	description: "Sets the message announced after a user joins.",
	handler: args => {
		const oldMsg = args.settings.get("join_message");
		if (args.joinMessage) {
			if (oldMsg === args.joinMessage) {
				args.send(args.localize("update_join_message_no_change"));
			} else {
				args.settings.set("join_message", args.joinMessage);
				args.send(args.localize("update_join_message"));
			}
		} else if (oldMsg === undefined) {
			args.send(args.localize("clear_join_message_no_change"));
		} else {
			args.settings.clear("join_message");
			args.send(args.localize("clear_join_message"));
		}
	},
	longDescription: "Sets the message that is sent when a user joins the channel. {USER} is replaced with the user's name.",
	name: "setjoinmessage",
};