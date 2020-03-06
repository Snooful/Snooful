const channelSub = require("./channel-sub.js");
const pify = require("./promisify.js");

const { gateway } = require("./debug.js");

/**
 * Applies context formats to a message.
 * @param {string} message The message to apply context formats to.
 * @param {string} username The target username of the event.
 * @param {string} lang The language of the channel the event message is being sent to.
 * @returns {string} The message with context formats applied.
 */
function applyContextFormats(message, username, lang = "en-US") {
	if (username) {
		message = message.replace(/{USER}/g, username);
	}
	message = message.replace(/{WHEN}/g, new Date().toLocaleString(lang));

	return message;
}

/**
 * Makes a message-sending handler for an event.
 * @param {string} type The type of event message being handled.
 * @param {SettingsManager} settings The settings to retrieve the channel's event message from.
 * @param {string} clientName The nickname of the client.
 * @param {boolean} handleSelf Whether to handle the event message for events caused by the client.
 * @returns {Function} The message-sending handler.
 */
function eventMessageHandler(type = "event", settings, clientName = "Snooful", handleSelf = false) {
	return (channel, user) => {
		// Ignore events from self if not handling self
		if (user && user.nickname === clientName && !handleSelf) return;

		gateway("handling %s event message in '%s' channel", type, channel.name);

		const sub = channelSub(channel);
		const eventMessage = settings.get(sub, type + "_message");
		if (eventMessage !== undefined) {
			pify(channel.sendUserMessage.bind(channel), applyContextFormats(eventMessage, user && user.nickname, settings.get(sub, "lang"))).then(() => {
				gateway("sent %s event message in '%s' channel", type, channel.name);
			}).catch(() => {
				gateway("failed to send %s event message in '%s' channel", type, channel.name);
			});
		}
	};
}
module.exports = eventMessageHandler;
