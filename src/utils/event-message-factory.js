const channelSub = require("./channel-sub.js");
const pify = require("./promisify.js");

function eventMessageFactory(type, handleSelf = false) {
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
module.exports = eventMessageFactory;
