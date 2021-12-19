const channelSub = require("../channel-sub.js");
const pify = require("../promisify.js");

const { gateway } = require("../debug.js");

const applyContextFormats = require("../context-formats/apply.js");

/**
 * Makes a message-sending handler for an event.
 * @param {string} type The type of event message being handled.
 * @param {string} prefix The event message prefix.
 * @param {SettingsManager} settings The settings to retrieve the channel's event message from.
 * @param {Function<string>} clientNameGetter A getter for the nickname of the client.
 * @param {boolean} handleSelf Whether to handle the event message for events caused by the client.
 * @returns {Function} The message-sending handler.
 */
function eventMessageHandler(type = "event", prefix, settings, clientNameGetter = "Snooful", handleSelf = false) {
	return (channel, user) => {
		// Ignore events from self if not handling self
		if (user && user.nickname === clientNameGetter() && !handleSelf) return;

		gateway("handling %s event message in '%s' channel", type, channel.name);

		const sub = channelSub(channel);
		const eventMessage = settings.get(sub, type + "_message");
		if (eventMessage !== undefined) {
			const appliedMessage = applyContextFormats(eventMessage, channel, settings.get(sub, "lang"), user);
			pify(channel.sendUserMessage.bind(channel), prefix + " " + appliedMessage).then(() => {
				gateway("sent %s event message in '%s' channel", type, channel.name);
			}).catch(() => {
				gateway("failed to send %s event message in '%s' channel", type, channel.name);
			});
		}
	};
}
module.exports = eventMessageHandler;
