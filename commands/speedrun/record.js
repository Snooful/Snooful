const url = require("url-escape-tag");
const rp = require("request-promise-native");

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
			rp(url`https://www.speedrun.com/api/v1/games?name=${args.game}&max=1`).then(gamesRaw => {
				const game = JSON.parse(gamesRaw).data[0];
				rp(url `https://www.speedrun.com/api/v1/games/${game.id}/records?miscellaneous=no&scope=full-game&top=1`).then(runsRaw => {
					const topRun = JSON.parse(runsRaw).data[0].runs[0].run;
					const speed = moment.duration(topRun.times.primary_t, "seconds").format("h [hours], m [minutes], s [seconds]");
					args.send(`The world record for ${game.names.international} is at ${speed}. For more information, view ${topRun.weblink}.`);
				});
			}).catch(() => {
				args.send("I could not fetch the game!");
			});
		} else {
			args.send("Please specify a game.");
		}
	},
};