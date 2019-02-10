const hasEmoji = require("./../../utils/has-emoji.js");
module.exports = {
	arguments: [{
		description: "The text to check if there's an emoji in.",
		key: "text",
		required: true,
		type: "string",
	}],
	category: "emoji",
	description: "Checks for emoji in text.",
	handler: args => {
		if (hasEmoji(args.text)) {
			args.send(args.localize("text_includes_emoji"));
		} else {
			args.send(args.localize("text_includes_no_emoji"));
		}
	},
	name: "hasemoji",
};
