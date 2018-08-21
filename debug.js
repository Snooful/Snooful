const debug = require("debug");

/**
 * All debuggers.
 */
module.exports = {
	/**
	 * Debug for handling/parsing commands.
	 */
	commands: debug("snooful:commands"),
	/**
	 * Debug for join and leave messages.
	 */
	gateway: debug("snooful:gateway"),
	/**
	 * Debug for automatically accepting invites to channels.
	 */
	invites: debug("snooful:invites"),
	/**
	 * Debug for initializing Snooful.
	 */
	main: debug("snooful:main"),
	/**
	 * Debug for the settings manager.
	 */
	settings: debug("snooful:settings"),
};