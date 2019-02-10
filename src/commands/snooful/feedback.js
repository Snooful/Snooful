const toChannel = "sendbird_group_channel_961019_3546ab525611fe34f46eb0e7b93257a9f2c0a4b2";
const pify = require("./../../utils/promisify.js");

module.exports = {
	aliases: [
		"suggest",
	],
	arguments: [{
		description: "The feedback to send.",
		key: "text",
		type: "string",
	}],
	category: "snooful",
	description: "Send feedback to Snooful's creator.",
	handler: args => {
		if (args.text) {
			pify(args.sb.GroupChannel.getChannel.bind(args.sb.GroupChannel), toChannel).then(channel => {
				const feedbackMsg = args.localize("feedback_recieved", args.author, args.channel.name, args.text);
				pify(channel.sendUserMessage.bind(channel), feedbackMsg).then(() => {
					args.log("sent feedback to channel");
					args.send(args.localize("feedback_success"));
				}).catch(() => {
					args.send(args.localize("feedback_error"));
					args.log("could not send feedback to channel");
				});
			}).catch(() => {
				args.send(args.localize("feedback_error"));
				args.log("error with fetching feedback channel");
			});
		} else {
			args.send(args.localize("feedback_unspecified"));
		}
	},
	name: "feedback",
};
