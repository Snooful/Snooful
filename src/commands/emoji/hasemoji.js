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
		// todo: proper localizations
		if (hasEmoji(args.text)) {
			args.send("text does have emoji");
		} else {
			args.send("no emoji in text");
		}
	},
	name: "hasemoji",
};
