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
}

class CustomContextFormat extends ContextFormat {
	constructor(id, replacer) {
		super(id);
		this.replacer = replacer;
	}

	getValue(...contexts) {
		return this.replacer(...contexts);
	}
}

/**
 * @type {ContextFormat[]}
 */
const contextFormats = [
	new CustomContextFormat("user", context => {
		if (context.user && context.user.nickname) {
			return context.user.nickname;
		}
	}),
	new CustomContextFormat("when", context => {
		return new Date().toLocaleString(context.language);
	}),
];
module.exports.contextFormats = contextFormats;

/**
 * Applies context formats to a message.
 * @param {string} originalMessage The message to apply context formats to.
 * @param {*} channel The channel the event occurred in,
 * @param {string} language The language of the channel the event message is being sent to.
 * @param {*} user The target user of the event.
 * @returns {string} The message with context formats applied.
 */
function applyContextFormats(originalMessage, channel, language = "en-US", user) {
	return contextFormats.reduce((message, contextFormat) => {
		return contextFormat.format(message, {
			channel,
			language,
			user,
		});
	}, originalMessage);
}
module.exports.applyContextFormats = applyContextFormats;