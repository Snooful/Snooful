const got = require("got");

function errorHandler(error, send, localize, type = "game") {
	if (error instanceof got.CacheError) {
		send(localize("record_cache_error", type));
	} else if (error instanceof got.RequestError) {
		send(localize("record_request_error", type));
	} else if (error instanceof got.ReadError) {
		send(localize("record_read_error", type));
	} else if (error instanceof got.ParseError) {
		send(localize("record_parse_error", type));
	} else if (error instanceof got.HTTPError) {
		if (error.statusCode.startsWith("4")) {
			send(localize("record_4xx_error", type, error.statusCode));
		} else if (error.statusCode.startsWith("5")) {
			send(localize("record_5xx_error", type, error.statusCode));
		} else {
			send(localize("record_http_error", type, error.statusCode));
		}
	} else if (error instanceof got.MaxRedirectsError) {
		send(localize("record_redirect_error", type));
	} else if (error instanceof got.UnsupportedProtocolError) {
		send(localize("record_protocol_error", type));
	} else if (error instanceof got.CancelError) {
		send(localize("record_cancel_error", type));
	} else if (error instanceof got.TimeoutError) {
		send(localize("record_timeout_error", type));
	} else {
		send(localize("record_generic_error", type));
	}
}

module.exports = (url, gotOpts, args = {}, opts = {}) => {
  return got(url, gotOpts).catch(error => {
    errorHandler(error, args.send, args.localize, args.localize(opts.contentType));
  });
};
