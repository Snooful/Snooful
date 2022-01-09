const pify = require("pify");

/**
 * Promisifies and runs a function.
 * @param {Function} input The function to promisify and run.
 * @param {...any} args The arguments to pass to the function when running it.
 * @returns {Promise} A promise resolving to the output of the function and rejecting to an error if
 */
function promisify(input, ...args) {
	if (!input) {
		throw new TypeError("The input parameter is required.");
	} else if (typeof input !== "function") {
		throw new TypeError("The input parameter must be a function with a callback to promisify.");
	}

	return pify(input, {
		errorFirst: true,
	})(...args);
}
module.exports = promisify;
