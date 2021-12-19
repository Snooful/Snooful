const ContextFormat = require("./default.js");

class PropertyContextFormat extends ContextFormat {
	constructor(id, property) {
		super(id);
		this.property = property || id;
	}

	getValue(...contexts) {
		const contextWithProperty = contexts.find(context => {
			return context[this.property];
		});

		if (contextWithProperty) {
			return contextWithProperty[this.property];
		}
	}
}
module.exports = PropertyContextFormat;
