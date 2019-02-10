const emoji = require("node-emoji");

function hasEmoji(text) {
	return text !== emoji.unemojify(text);
}
module.exports = hasEmoji;