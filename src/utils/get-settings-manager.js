const { settings: log } = require("./debug.js");

/**
 * Loads a settings manager module.
 * @param {string} id The ID of the settings manager.
 * @returns {?} The settings manager module.
 */
function requireSettingsManager(id) {
	try {
		return require(id);
	} catch (error) {
		if (error instanceof SyntaxError) {
			log("could not load the settings manager module due to a syntax error");
		} else if (error.code === "MODULE_NOT_FOUND") {
			log("could not find a settings manager module with the id '%s'", id);
		} else {
			log("could not load the settings manager module (error code '%s', message '%s')", error.code, error.message);
		}
		return null;
	}
}

/**
 * Gets a settings manager from its configuration.
 * @param {Object} config The settings manager configuration.
 * @returns {SettingsManager?} The settings manager.
 */
function getSettingsManager(config) {
	try {
		if (config.instance) {
			return config.instance;
		} else if (config.class) {
			return new config.class(config.options || "settings" + config.class.extension);
		} else if (config.require) {
			const requiredManagerClass = requireSettingsManager(config.require);
			if (requiredManagerClass === null) return null;

			return new requiredManagerClass(config.options || "settings" + requiredManagerClass.extension);
		}

		log("could not load the settings manager because an instance, class, or package ID was not provided");
	} catch (error) {
		log("could not load the settings manager (error code '%s', message '%s')", error.code, error.message);
	}
	return null;
}
module.exports = getSettingsManager;