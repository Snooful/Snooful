const url = require("url-escape-tag");
const got = require("got");

const moment = require("moment");
require("moment-duration-format");

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
					args.send(`The world record for ${game.names.international} is at ${speed}. For more information, view ${topRun.weblink}.`);
				});
			}).catch(error => {
				if (error instanceof got.CacheError) {
					args.send("There was an error reading from the cache!");
				} else if (error instanceof got.RequestError) {
					args.send("There was an error when trying to make a request to the speedrun.com API!");
				} else if (error instanceof got.ReadError) {
					args.send("There was an error reading from the response stream!");
				} else if (error instanceof got.ParseError) {
					args.send("The speedrun.com API isn't sending valid JSON, for some reason!");
				} else if (error instanceof got.HTTPError) {
					if (error.statusCode.startsWith("4")) {
						args.send("There was a client error!");
					} else if (error.statusCode.startsWith("5")) {
						args.send("The server had an error!");
					} else {
						args.send("There was an HTTP error!");
					}
				} else if (error instanceof got.MaxRedirectsError) {
					args.send("There were too many redirects!");
				} else if (error instanceof got.UnsupportedProtocolError) {
					args.send("The protocol is unsupported!");
				} else if (error instanceof got.CancelError) {
					args.send("The request was cancelled.");
				} else if (error instanceof got.TimeoutError) {
					args.send("The game lookup took too long!");
				} else {
					args.send("I could not fetch the game!");
				}
			});
		} else {
			args.send("Please specify a game.");
		}
	},
};