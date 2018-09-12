const got = require("got");

function errorHandler(error, send, localize, type = "game", prefix = "fetch") {
	if (error instanceof got.CacheError) {
		send(localize(prefix + "_cache_error", type));
	} else if (error instanceof got.RequestError) {
		send(localize(prefix + "_request_error", type));
	} else if (error instanceof got.ReadError) {
		send(localize(prefix + "_read_error", type));
	} else if (error instanceof got.ParseError) {
		send(localize(prefix + "_parse_error", type));
	} else if (error instanceof got.HTTPError) {
		if (error.statusCode.startsWith("4")) {
			send(localize(prefix + "_4xx_error", type, error.statusCode));
		} else if (error.statusCode.startsWith("5")) {
			send(localize(prefix + "_5xx_error", type, error.statusCode));
		} else {
			send(localize(prefix + "_http_error", type, error.statusCode));
		}
	} else if (error instanceof got.MaxRedirectsError) {
		send(localize(prefix + "_redirect_error", type));
	} else if (error instanceof got.UnsupportedProtocolError) {
		send(localize(prefix + "_protocol_error", type));
	} else if (error instanceof got.CancelError) {
		send(localize(prefix + "_cancel_error", type));
	} else if (error instanceof got.TimeoutError) {
		send(localize(prefix + "_timeout_error", type));
	} else {
		send(localize(prefix + "_generic_error", type));
	}
}

module.exports = (url, args = {}, opts = {}) => {
  return got(url, opts.got || {}).catch(error => {
    errorHandler(error, args.send, args.localize, args.localize(opts.contentType), opts.errorKeyPrefix);
  });
};
