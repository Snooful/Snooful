const supportChannel = "sendbird_group_channel_961019_fb957911b064712bc24f215f2ebc4a64168df72d";
const pify = require("./../../utils/promisify.js");

module.exports = {
	description: "Invites you to Snooful's support channel.",
	handler: args => {
		pify(args.sb.GroupChannel.getChannel.bind(args.sb.GroupChannel), supportChannel).then(channel => {
			pify(channel.invite.bind(channel), [args.message.sender]).then(() => {
				args.send(args.localize("support_invited"));
			}).catch(() => {
				args.send(args.localize("support_invite_error"));
			});
		}).catch(() => {
			args.send(args.localize("support_channel_missing"));
		});
	},
	name: "support",
};