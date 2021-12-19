const path = require("path");
const rqAll = require("require-all");

/**
 * Gets the locales object.
 * @returns {Object} The locales object.
 */
function getLocales() {
	const locales = rqAll({
		dirname: path.resolve(__dirname, "../../locales"),
		filter: /(.+)\.json$/,
	});
	return locales;
}
module.exports = getLocales;
