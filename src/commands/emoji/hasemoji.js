const emoji = require("node-emoji");

function hasEmoji(text) {
	return text !== emoji.unemojify(text);
}

module.exports = {
	arguments: [{
		description: "The text to check if there's an emoji in.",
		key: "text",
		required: true,
		type: "string",
	}],
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
