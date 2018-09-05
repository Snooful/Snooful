const chance = require("chance").Chance();

module.exports = {
	command: "roll",
	describe: "Rolls a six-sided die.",
	aliases: [
		"dice",
		"d6",
	],
	handler: args => args.send(`The die lands on a ${chance.integer({
		min: 1,
		max: 6,
	})}.`),
};