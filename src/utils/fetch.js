const mem = require("mem");
const got = mem(require("got"), {
	// Cache results for 15 minutes
	maxAge: 15 * 60 * 1000,
});

/**
 * Localizes a message, using a custom prefix if possible.
 * @param {Function} localize The function to localize messages with.
 * @param {string} prefix The prefix of the localization keys.
 * @param {string} otherPart The localization key excluding the prefix.
 * @param  {...any} formats Formatting to apply to the localized message.
 * @returns {string} The localized message.
 */
function safeLocal(localize, prefix, otherPart, ...formats) {
	const customed = localize(prefix + "_" + otherPart, ...formats);
	if (customed) {
		return customed;
	} else {
		return localize(`fetch_${otherPart}`, ...formats);
	}
}

/**
 * Handles an error.
 * @param {Error} error The error to handle.
 * @param {Function} send The function to send messages with.
 * @param {Function} localize The function to localize messages with.
 * @param {string} type The type of data that failed to be fetched.
 * @param {string} prefix The prefix of the localization keys.
 */
function errorHandler(error, send, localize, type, prefix) {
	if (error instanceof got.CacheError) {
		send(safeLocal(localize, prefix, "cache_error", type));
	} else if (error instanceof got.RequestError) {
		send(safeLocal(localize, prefix, "request_error", type));
	} else if (error instanceof got.ReadError) {
		send(safeLocal(localize, prefix, "read_error", type));
	} else if (error instanceof got.ParseError) {
		send(safeLocal(localize, prefix, "parse_error", type));
	} else if (error instanceof got.HTTPError) {
		if (error.statusCode.startsWith("4")) {
			send(safeLocal(localize, prefix, "4xx_error", type, error.statusCode));
		} else if (error.statusCode.startsWith("5")) {
			send(safeLocal(localize, prefix, "5xx_error", type, error.statusCode));
		} else {
			send(safeLocal(localize, prefix, "http_error", type, error.statusCode));
		}
	} else if (error instanceof got.MaxRedirectsError) {
		send(safeLocal(localize, prefix, "redirect_error", type));
	} else if (error instanceof got.UnsupportedProtocolError) {
		send(safeLocal(localize, prefix, "protocol_error", type));
	} else if (error instanceof got.CancelError) {
		send(safeLocal(localize, prefix, "cancel_error", type));
	} else if (error instanceof got.TimeoutError) {
		send(safeLocal(localize, prefix, "timeout_error", type));
	} else {
		send(safeLocal(localize, prefix, "generic_error", type));
	}
}

/**
 * Fetches a URL with got which has optional error handling.
 * @param {string} url The URL to fetch.
 * @param {Object} args Arguments from the handler.
 * @param {Object} opts Extra options.
 * @param {Object} opts.got Options for got to use.
 * @param {boolean} opts.handleErrors If enabled, sends a message when an error occurs with the request.
 * @param {string} opts.errorKeyPrefix The prefix for the localization keys of errors.
 * @param {string} opts.contentType The type of content being requested for use in the error handler.
 * @returns {Promise} A promise that resolves to got's response.
 */
function fetch(url, args = {}, opts) {
	const optsFixed = {
		contentType: "data",
		errorKeyPrefix: "fetch",
		got: {},
		handleErrors: true,
		...opts,
	};

	return got(url, optsFixed.got || {}).catch(error => {
		if (optsFixed.handleErrors) {
			errorHandler(error, args.send, args.localize, args.localize(optsFixed.contentType), optsFixed.errorKeyPrefix);
		}
	});
}
module.exports = fetch;
