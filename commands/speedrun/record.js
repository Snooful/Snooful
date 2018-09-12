const url = require("url-escape-tag");
const got = require("got");

const moment = require("moment");
require("moment-duration-format");

function errorHandler(error, send, localize, type = "game") {
	if (error instanceof got.CacheError) {
		send(localize("speedrun_cache_error", type));
	} else if (error instanceof got.RequestError) {
		send(localize("speedrun_request_error", type));
	} else if (error instanceof got.ReadError) {
		send(localize("speedrun_read_error", type));
	} else if (error instanceof got.ParseError) {
		send(localize("speedrun_parse_error", type));
	} else if (error instanceof got.HTTPError) {
		if (error.statusCode.startsWith("4")) {
			send(localize("speedrun_4xx_error", type, error.statusCode));
		} else if (error.statusCode.startsWith("5")) {
			send(localize("speedrun_5xx_error", type, error.statusCode));
		} else {
			send(localize("speedrun_http_error", type, error.statusCode));
		}
	} else if (error instanceof got.MaxRedirectsError) {
		send(localize("speedrun_redirect_error", type));
	} else if (error instanceof got.UnsupportedProtocolError) {
		send(localize("speedrun_protocol_error", type));
	} else if (error instanceof got.CancelError) {
		send(localize("speedrun_cancel_error", type));
	} else if (error instanceof got.TimeoutError) {
		send(localize("speedrun_timeout_error", type));
	} else {
		send(localize("speedrun_generic_error", type));
	}
}

module.exports = {
	aliases: [
		"toprun",
		"wr",
		"worldrecord",
	],
	command: "record [game]",
	describe: "Gets the world record for a game on speedrun.com.",
	handler: args => {
		if (args.game) {
			got(url`https://www.speedrun.com/api/v1/games?name=${args.game}&max=1`, {
				json: true,
			}).then(gameResponse => {
				const game = gameResponse.body.data[0];
				got(url `https://www.speedrun.com/api/v1/games/${game.id}/records?miscellaneous=no&scope=full-game&top=1`, {
					json: true,
				}).then(runsResponse => {
					const topRun = runsResponse.body.data[0].runs[0].run;
					const speed = moment.duration(topRun.times.primary_t, "seconds").format("h [hours], m [minutes], s [seconds]");
					args.send(args.localize("record", game.names.international, speed, topRun.weblink));
				}).catch(error => {
					errorHandler(error, args.send, args.localize, args.localize("record_runs_type"));
				});
			}).catch(error => {
				errorHandler(error, args.send, args.localize, args.localize("record_game_type"));
			});
		} else {
			args.send(args.localize("record_game_unspecified"));
		}
	},
};
