/**
 * @typedef {Object} UnprefixedInfo
 * @property {string} unprefixedCmd The unprefixed command.
 * @property {string} usedPrefixType The type of prefixed used.
 */

/**
 * Unprefixes a command.
 * @param {string} command The command to unprefix.
 * @param {Object} prefixes The prefixes.
 * @returns {UnprefixedInfo} Information about the unprefixed command.
 */
function unprefixCommand(command, prefixes) {
	if (prefixes.start && command.startsWith(prefixes.start)) {
		return {
			unprefixedCmd: command.replace(prefixes.start, ""),
			usedPrefixType: "start",
		};
	} else if (prefixes.global && command.includes(prefixes.global)) {
		return {
			unprefixedCmd: command.slice(command.indexOf(prefixes.global) + prefixes.global.length),
			usedPrefixType: "global",
		};
	}

	return null;
}
module.exports = unprefixCommand;
