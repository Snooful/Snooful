module.exports = {
	category: "snooful",
	description: "Invites you to Snooful's support channel.",
	handler: args => {
		args.sb.GroupChannel.getChannel("sendbird_group_channel_961019_fb957911b064712bc24f215f2ebc4a64168df72d", (channel, getError) => {
			if (getError) {
				args.send(args.localize("support_channel_missing"));
			} else {
				channel.invite([args.message.sender], (_, inviteError) => {
					if (inviteError) {
						args.send(args.localize("support_invite_error"));
					} else {
						args.send(args.localize("support_invited"));
					}
				});
			}
		});
	},
	name: "support",
};