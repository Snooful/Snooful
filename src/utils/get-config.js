const cosmic = require("cosmiconfig");

/**
 * Transforms a config.
 */
function transformConfig(result) {
	const newConfig = {
		credentials: {},
		prefix: {
			global: null,
			start: "!",
		},
		settingsManager: "@snooful/sqlite-settings",
		...result.config,
	};

	if (typeof newConfig.prefix === "string") {
		newConfig.prefix.start = result.config.prefix;
		newConfig.prefix.global = null;
	}

	result.config = newConfig;
	return result;
}

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
		transform: transformConfig,
	});
	return explorer.searchSync().config;
}
module.exports = getConfig;