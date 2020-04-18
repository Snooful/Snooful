const cosmic = require("cosmiconfig");
const { configuration: log } = require("./debug.js");

/**
 * Transforms a config.
 * @param {Object} result The config result from cosmiconfig.
 * @returns {Object} The result with the transformed config.
 */
function transformConfig(result) {
	const newConfig = {
		credentials: {},
		prefix: {
			global: null,
			start: "!",
		},
		settingsManager: {
			require: "@snooful/sqlite-settings",
		},
		...result.config,
	};

	if (typeof newConfig.settingsManager === "string") {
		log("changed settings manager configuration to use object instead of string");

		newConfig.settingsManager = {};
		newConfig.settingsManager.require = result.config.settingsManager;
	}

	if (typeof newConfig.prefix === "string") {
		log("changed prefix configuration to use object instead of string");

		newConfig.prefix = {};
		newConfig.prefix.start = result.config.prefix;
		newConfig.prefix.global = null;
	}

	result.config = newConfig;
	return result;
}

/**
 * Gets the user-defined configuration for Snooful with defaults.
 * @returns {Object} The configuration object.
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

	const result = explorer.searchSync();

	log("loaded configuration from '%s'", result.filepath);
	log("loaded configuration: %O", result.config);

	return result.config;
}
module.exports = getConfig;