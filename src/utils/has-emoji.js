const emoji = require("node-emoji");

/**
 * Checks whether text includes emoji.
 * @param {string} text The text to check for emoji.
 * @returns {boolean} Whether the given text includes emoji.
 */
function hasEmoji(text) {
	return text !== emoji.unemojify(text);
}
module.exports = hasEmoji;