const channelSub = require("./channel-sub.js");
const pify = require("./promisify.js");

/**
 * Makes a message-sending handler for an event.
 * @param {string} type The type of event message being handled.
 * @param {SettingsManager} settings The settings to retrieve the channel's event message from.
 * @param {Object} client The client.
 * @param {*} log The logger for debug.
 * @param {boolean} handleSelf Whether to handle the event message for events caused by the client.
 * @returns {Function}
 */
function eventMessageHandler(type = "event", settings, client, log, handleSelf = false) {
	return (channel, user) => {
		if (user.nickname === client.nickname && !handleSelf) return;

		log.gateway("handling %s message", type);

		const sub = channelSub(channel);
		if (settings.get(sub, type + "_message") !== undefined) {
			pify(channel.sendUserMessage.bind(channel), settings.get(sub, type + "_message").replace(/{USER}/g, user.nickname)).then(() => {
				log.gateway("sent %s message", type);
			}).catch(() => {
				log.gateway("failed to send %s message", type);
			});
		}
	};
}
module.exports = eventMessageHandler;
