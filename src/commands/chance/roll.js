const chance = require("chance").Chance();

module.exports = {
	aliases: [
		"dice",
		"d6",
	],
	category: "chance",
	description: "Rolls a six-sided die.",
	handler: args => args.send(args.localize("die_land", chance.integer({
		max: 6,
		min: 1,
	}))),
	name: "roll",
};