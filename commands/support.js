module.exports = {
	command: "support",
	describe: "Invites you to Snooful's support channel.",
	handler: args => {
		args.sb.GroupChannel.getChannel("sendbird_group_channel_961019_fb957911b064712bc24f215f2ebc4a64168df72d", (channel, getError) => {
			if (getError) {
				args.send("Sorry, I couldn't find the channel I wanted to invite you to!");
			} else {
				channel.invite([args.message.sender], (channel, inviteError) => {
					if (inviteError) {
						args.send("Sorry, something went wrong with the invitation!");
					} else {
						args.send("I've invited you to the support channel.");
					}
				});
			}
		});
	},
};