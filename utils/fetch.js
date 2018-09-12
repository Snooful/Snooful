const got = require("got");

function safeLocal(localize, prefix, otherPart, ...formats) {
	const customed = localize(prefix + "_" + otherPart, ...formats);
	if (customed) {
		return customed;
	} else {
		return localize(`fetch_${otherPart}`, ...formats);
	}
}

function errorHandler(error, send, localize, type = "game", prefix = "fetch") {
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

module.exports = (url, args = {}, opts = {}) => {
	return got(url, opts.got || {}).catch(error => {
		if (opts.handleErrors) {
			errorHandler(error, args.send, args.localize, args.localize(opts.contentType), opts.errorKeyPrefix);
		}
	});
};
