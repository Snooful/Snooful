const { invites: log } = require("./debug.js");
const pify = require("./promisify");

/**
 * Accepts an invite to a channel.
 * @param {sendbird.GroupChannel} channel The channel to accept an invite to.
 * @param {boolean} isLate Whether the invitation is being handled late.
 * @returns {Promise<boolean>} A promise resolving to whether the invite was successfully accepted.
 */
function acceptInvite(channel, isLate = false) {
	return pify(channel.acceptInvitation.bind(channel)).then(() => {
		if (isLate) {
			log("accepted late channel invitation to '%s'", channel.name);
		} else {
			log("automatically accepted channel invitation to '%s'", channel.name);
		}
		return true;
	}).catch(() => {
		if (isLate) {
			log("failed to accept late channel invitation to '%s'", channel.name);
		} else {
			log("failed to accept channel invitation to '%s'", channel.name);
		}
		return false;
	});
}
module.exports = acceptInvite;