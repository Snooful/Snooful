const contextFormats = require("./get");

/**
 * Applies context formats to a message.
 * @param {string} originalMessage The message to apply context formats to.
 * @param {*} channel The channel the event occurred in,
 * @param {string} language The language of the channel the event message is being sent to.
 * @param {*} user The target user of the event.
 * @returns {string} The message with context formats applied.
 */
function applyContextFormats(originalMessage, channel, language = "en-US", user) {
	return contextFormats.reduce((message, contextFormat) => {
		return contextFormat.format(message, {
			channel,
			language,
			user,
		});
	}, originalMessage);
}
module.exports = applyContextFormats;