class ContextFormat {
	constructor(id) {
		this.id = id;
		this.match = new RegExp("{" + this.id.toUpperCase() + "}", "g");
	}

	/**
	 * Gets the value to transform the placeholder to.
	 * @returns {string} The replacement value of the placeholder.
	 * @returns {boolean} If false, the replacement was unsuccessful.
	 * @abstract
	 */
	getValue() {
		return false;
	}

	/**
	 * Applys this context format to a message.
	 * @param {string} message The message to apply this context format to.
	 * @param {...any} contexts The contexts to get a value from.
	 * @returns {string} The message with the context format applied, if successful.
	 */
	format(message, ...contexts) {
		const value = this.getValue(...contexts);
		if (typeof value === "string") {
			return message.replace(this.match, value);
		} else {
			return message;
		}
	}

	/**
	 * Gets the localized description of this context format.
	 * @param {Function} localize The localization function.
	 * @returns {string} The localized description of this context format.
	 */
	getDescription(localize) {
		return localize("context_format_" + this.id + "_description");
	}
}
module.exports = ContextFormat;
