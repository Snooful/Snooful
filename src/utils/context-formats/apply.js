const contextFormats = require("./get.js")();

/**
 * Applies context formats to a message.
 * @param {string} originalMessage The message to apply context formats to.
 * @param {*} [channel] The channel the event occurred in,
 * @param {string} [language] The language of the channel this message is being sent in.
 * @param {*} [user] The target user of the event.
 * @param {string} [prefix] The prefix in the channel this message is being sent in.
 * @returns {string} The message with context formats applied.
 */
function applyContextFormats(originalMessage, channel, language = "en-US", user, prefix) {
	return contextFormats.reduce((message, contextFormat) => {
		return contextFormat.format(message, {
			channel,
			language,
			prefix,
			user,
		});
	}, originalMessage);
}
module.exports = applyContextFormats;
