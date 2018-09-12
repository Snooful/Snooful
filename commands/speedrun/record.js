const url = require("url-escape-tag");
const got = require("got");

const moment = require("moment");
require("moment-duration-format");

function errorHandler(error, send, localize, type = "game") {
	if (error instanceof got.CacheError) {
		send("There was an error reading from the cache!");
	} else if (error instanceof got.RequestError) {
		send("There was an error when trying to make a request to the speedrun.com API!");
	} else if (error instanceof got.ReadError) {
		send("There was an error reading from the response stream!");
	} else if (error instanceof got.ParseError) {
		send("The speedrun.com API isn't sending valid JSON, for some reason!");
	} else if (error instanceof got.HTTPError) {
		if (error.statusCode.startsWith("4")) {
			send("There was a client error!");
		} else if (error.statusCode.startsWith("5")) {
			send("The server had an error!");
		} else {
			send("There was an HTTP error!");
		}
	} else if (error instanceof got.MaxRedirectsError) {
		send(`There were too many redirects when attempting to retrieve the ${type}!`);
	} else if (error instanceof got.UnsupportedProtocolError) {
		send("The protocol is unsupported!");
	} else if (error instanceof got.CancelError) {
		send("The request was cancelled.");
	} else if (error instanceof got.TimeoutError) {
		send(`Retrieving the ${type} took too long!`);
	} else {
		send(`I could not fetch the ${type}!`);
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
					errorHandler(error, args.send, args.localize, "runs");
				});
			}).catch(error => {
				errorHandler(error, args.send, args.localize, "game");
			});
		} else {
			args.send(args.localize("record_game_unspecified"));
		}
	},
};
