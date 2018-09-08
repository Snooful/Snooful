const toChannel = "sendbird_group_channel_961019_3546ab525611fe34f46eb0e7b93257a9f2c0a4b2";

module.exports = {
	aliases: [
		"suggest",
	],
	builder: cmd => {
		cmd.positional("text", {
			type: "string",
		});
	},
	command: "feedback [text...]",
	describe: "Send feedback to Snooful's creator.",
	handler: args => {
		if (args.text) {
			args.sb.GroupChannel.getChannel(toChannel, (channel, error) => {
				if (error) {
					args.send(args.localize("feedback_error"));
					args.log("error with fetching feedback channel");
				} else {
					channel.sendUserMessage(args.localize("feedback_recieved", args.author, args.channel.name, args.text.join(" ")), (_, sendError) => {
						if (sendError) {
							args.send(args.localize("feedback_error"));
							args.log("could not send feedback to channel");
						} else {
							args.log("sent feedback to channel");
						}
					});
					args.send(args.localize("feedback_success"));
				}
			});
		} else {
			args.send(args.localize("feedback_unspecified"));
		}
	},
};