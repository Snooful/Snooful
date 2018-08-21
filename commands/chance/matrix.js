const chance = require("chance").Chance();

module.exports = {
	command: "matrix",
	describe: "Provides a line of random binary.",
	handler: args => args.send(chance.n(chance.integer, 40, {
		max: 1,
		min: 0,
	}).join("")),
};