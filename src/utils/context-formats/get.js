const path = require("path");
const rqAll = require("require-all");

/**
 * Gets all context formats
 * @returns {ContextFormat[]}
 */
function getContextFormats() {
	const contextFormats = rqAll({
		dirname: path.resolve(__dirname, "../../context-formats"),
		filter: /(.+)\.js$/,
	});
	return Object.values(contextFormats);
}
module.exports = getContextFormats;
