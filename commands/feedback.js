const toChannel = "sendbird_group_channel_961019_3546ab525611fe34f46eb0e7b93257a9f2c0a4b2";

module.exports = {
    command: "feedback <text...>",
	describe: "Send feedback to Snooful's creator.",
	builder: cmd => {
		cmd.positional("text", {
			type: "string",
		})
	},
    handler: args => {
		if (args.text) {
			args.sb.GroupChannel.getChannel(toChannel, (channel, error) => {
				if (error) {
					args.send("I couldn't send the feedback.");
					args.log("error with feedback command");
				} else {
					channel.sendUserMessage(`I have recieved the following message from u/${args.message._sender.nickname}:`, new Function());
					channel.sendUserMessage(args.text.join(" "), new Function());

					args.send("I have contacted my creator for you.");
				}
			});
		} else {
			args.send("You need to provide some feedback!");
		}
    }
};