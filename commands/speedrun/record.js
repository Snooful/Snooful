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
					args.send(args.localize("record", game.names.international, speed, topRun.weblink));
				});
			}).catch(() => {
				args.send(args.localize("record_fetch_error"));
			});
		} else {
			args.send(args.localize("record_game_unspecified"));
		}
	},
};