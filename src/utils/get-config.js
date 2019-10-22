const cosmic = require("cosmiconfig");

/**
 * Gets the user-defined configuration for Snooful with defaults.
 * @returns {object} The configuration object.
 */
function getConfig() {
	const explorer = cosmic("snooful", {
		searchPlaces: [
			"package.json",
			"config.json",
			".snoofulrc",
			".snoofulrc.json",
			".snoofulrc.yaml",
			".snoofulrc.yml",
			".snoofulrc.js",
			"snooful.config.js",
		],
		transform: result => ({
			credentials: {},
			prefix: "!",
			settingsManager: "@snooful/sqlite-settings",
			...result.config,
		}),
	});
	return explorer.searchSync();
}
module.exports = getConfig;