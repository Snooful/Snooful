const CustomContextFormat = require("../utils/context-formats/types/custom.js");

module.exports = new CustomContextFormat("user", context => {
	if (context.user && context.user.nickname) {
		return context.user.nickname;
	}
});