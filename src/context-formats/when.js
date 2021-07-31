const CustomContextFormat = require("../utils/context-formats/types/custom.js");

module.exports = new CustomContextFormat("when", context => {
	return new Date().toLocaleString(context.language);
});
