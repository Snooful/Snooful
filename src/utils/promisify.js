const pify = require("pify");

/**
 * Promisifies then runs a function.
 * @param {Function} The function to promisify and run.
 * @param {*[]} The arguments to pass to the function when running it.
 * @returns {Promise}
 */
module.exports = (input, ...args) => {
	if (!input) {
		throw new TypeError("The input parameter is required.");
	} else if (typeof input !== "function") {
		throw new TypeError("The input parameter must be a function with a callback to promisify.");
	}
	
	return pify(input, {
		errorFirst: true,
	})(...args);
};
