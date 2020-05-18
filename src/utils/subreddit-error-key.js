/**
 * Gets the type of a subreddit error.
 * @param {Error} error The subreddit error.
 * @returns {string} The error type.
 */
function getSubredditErrorType(error) {
	if (error.error === 404) {
		return error.reason || "not_found";
	}
	return "generic";
}

/**
 * Gets a localization key for a subreddit error.
 * @param {string} prefix The prefix to append to the error key.
 * @param {Error} error The subreddit error.
 * @returns {string} The error key.
 */
function getSubredditErrorKey(prefix, error) {
	return prefix + "_" + getSubredditErrorType(error) + "_error";
}
module.exports = getSubredditErrorKey;