const url = require("url-escape-tag");
const fetch = require("./../../utils/fetch.js");

const moment = require("moment");
require("moment-duration-format");

module.exports = {
	aliases: [
		"toprun",
		"wr",
		"worldrecord",
	],
	arguments: [{
		description: "The game to get the world record of.",
		key: "game",
		type: "string",
	}],
	category: "speedrun",
	description: "Gets the world record for a game on speedrun.com.",
	handler: args => {
		if (args.game) {
			fetch(url`https://www.speedrun.com/api/v1/games?name=${args.game}&max=1`, args, {
				contentType: "record_game_type",
				errorKeyPrefix: "record",
				got: {
					json: true,
				},
			}).then(gameResponse => {
				const game = gameResponse.body.data[0];
				fetch(url`https://www.speedrun.com/api/v1/games/${game.id}/records?miscellaneous=no&scope=full-game&top=1`, args, {
					contentType: "record_runs_type",
					errorKeyPrefix: "record",
					got: {
						json: true,
					},
				}).then(runsResponse => {
					const topRun = runsResponse.body.data[0].runs[0].run;
					const speed = moment.duration(topRun.times.primary_t, "seconds").format("h [hours], m [minutes], s [seconds]");
					args.send(args.localize("record", game.names.international, speed, topRun.weblink));
				});
			});
		} else {
			args.send(args.localize("record_game_unspecified"));
		}
	},
	name: "record",
};
