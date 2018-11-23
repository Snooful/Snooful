const chance = require("chance").Chance();

module.exports = {
	aliases: [
		"dice",
		"d6",
	],
	command: "roll",
	describe: "Rolls a six-sided die.",
	handler: args => args.send(args.localize("die_land", chance.integer({
		max: 6,
		min: 1,
	}))),
};