let debug;
try {
	debug = require("debug");
} catch (_) {
	debug = name => {
		return msg => {
			process.stdout.write(`${name} - ${msg}\n`);
		};
	};
}

/**
 * All debuggers.
 */
module.exports = {
	/**
	 * Debug for initializing Snooful.
	 */
	main: debug("snooful:main"),
	/**
	 * Debug for join and leave messages.
	 */
	gateway: debug("snooful:gateway"),
	/**
	 * Debug for handling/parsing commands.
	 */
	commands: debug("snooful:commands"),
	/**
	 * Debug for the settings manager.
	 */
	settings: debug("snooful:settings"),
	/**
	 * Debug for automatically accepting invites to channels.
	 */
	invites: debug("snooful:invites"),
};