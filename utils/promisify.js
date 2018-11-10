const pify = require("pify");

module.exports.sb = (input, ...args) => {
	return pify(input, {
		errorFirst: false,
	})(...args);
};
module.exports.pify = (input, ...args) => {
	return pify(input, {
		errorFirst: true,
	})(...args);
};