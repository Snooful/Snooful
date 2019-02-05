const paginate = require("./../../utils/paginate.js");

const emojiAPI = require("node-emoji");
const emojiList = emojiAPI.search("");

module.exports = paginate("emojis", () => {
	return emojiList.map(emoji => {
		return `${emoji.emoji} (${emoji.key.replace(/_/g, " ")})`;
	});
}, {
	command: {
		description: "Gives a list of emojis.",
	},
	dataType: "emoji_datatype",
});