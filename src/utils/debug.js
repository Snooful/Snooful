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
	 * Debug for handling/parsing commands.
	 */
module.exports.commands = debug("snooful:commands");
/**
	 * Debug for configuration loading and parsing.
	 */
module.exports.configuration = debug("snooful:configuration");
/**
	 * Debug for join and leave messages.
	 */
module.exports.gateway = debug("snooful:gateway");
/**
	 * Debug for automatically accepting invites to channels.
	 */
module.exports.invites = debug("snooful:invites");
/**
	 * Debug for initializing Snooful.
	 */
module.exports.main = debug("snooful:main");
/**
	 * Debug for the settings manager.
	 */
module.exports.settings = debug("snooful:settings");