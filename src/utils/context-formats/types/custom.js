const ContextFormat = require("./default.js");

class CustomContextFormat extends ContextFormat {
	constructor(id, replacer) {
		super(id);
		this.replacer = replacer;
	}

	getValue(...contexts) {
		return this.replacer(...contexts);
	}
}
module.exports = CustomContextFormat;