const emojiAPI = require("node-emoji");

/**
 * Standardizes an emoji key.
 * @param {string} original The emoji key to standardize.
 * @returns {string} The standardized emoji key.
 */
function getEmojiKey(original) {
	return original.replace(/(-| )+/g, "_");
}

module.exports = {
	aliases: [
		"getemoji",
		"findemoji",
		"lookupemoji",
	],
	arguments: [{
		description: "The emoji to look up.",
		key: "emoji",
		required: true,
		type: "string",
	}],
	description: "Gets the name for an emoji.",
	handler: args => {
		const key = getEmojiKey(args.emoji);
		const emoji = emojiAPI.find(key);

		args.send(args.localize("emoji_info", emoji.emoji, emoji.key.replace(/_/g, " ")));
	},
	name: "emojiinfo",
};
