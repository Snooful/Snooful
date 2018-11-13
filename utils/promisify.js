const pify = require("pify");
module.exports = (input, ...args) => {
	return pify(input, {
		errorFirst: true,
	})(...args);
};
