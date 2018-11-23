const pify = require("pify");

/**
 * Promisifies then runs a function.
 * @param {Function} The function to promisify and run.
 * @param {*[]} The arguments to pass to the function when running it.
 * @returns {Promise}
 */
module.exports = (input, ...args) => {
	return pify(input, {
		errorFirst: true,
	})(...args);
};
