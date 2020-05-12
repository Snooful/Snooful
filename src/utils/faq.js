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
		};
	}
}
module.exports = FAQ;