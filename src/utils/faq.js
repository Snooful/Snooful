const applyContextFormats = require("./context-formats/apply.js");

/**
 * A FAQ.
 */
class FAQ {
	constructor(data) {
		if (typeof data === "string") {
			data = {
				content: data,
			};
		}

		/**
		 * The content of the FAQ.
		 * @type {string}
		 */
		this.content = data.content;

		/**
		 * An object mapping each editor of the FAQ to their user ID.
		 * @type {Object<string, string>}
		 */
		this.editors = data.editors;

		/**
		 * The date the FAQ was last updated.
		 * @type {Date}
		 */
		this.lastUpdated = new Date(data.lastUpdated) || new Date();
	}

	getLength() {
		return this.content.length;
	}

	/**
	 * Gets the content with context formats applied.
	 * @param {Object} args The command arguments.
	 * @returns {string} The formatted content.
	 */
	getFormattedContent(args) {
		return applyContextFormats(this.content, args.channel, args.settings.get("lang"), args.sender, args.usedPrefix);
	}

	toJSON() {
		return {
			content: this.content,
			editors: this.editors,
			lastUpdated: this.lastUpdated.toISOString(),
		};
	}
}
module.exports = FAQ;
