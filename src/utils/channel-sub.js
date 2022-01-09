/**
 * Gets the subreddit from a channel.
 * @param {*} channel The channel to get the subreddit from.
 * @returns {string} The name of the subreddit the channel is in, or the URL identifier.
 */
function channelSub(channel) {
	if (channel.data) {
		const data = JSON.parse(channel.data);
		return data.subreddit ? data.subreddit.name : channel.url;
	} else {
		return channel.url;
	}
}
module.exports = channelSub;
