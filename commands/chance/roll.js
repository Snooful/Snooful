const chance = require("chance").Chance();

module.exports = {
	aliases: [
		"dice",
		"d6",
	],
	command: "roll",
	describe: "Rolls a six-sided die.",
	handler: args => args.send(`The die lands on a ${chance.integer({
		max: 6,
		min: 1,
	})}.`),
};