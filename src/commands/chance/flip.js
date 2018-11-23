const chance = require("chance").Chance();

module.exports = {
	alias: "coin",
	command: "flip",
	describe: "Flips a coin.",
	handler: args => args.send(`The coin landed on ${chance.weighted([
		"heads",
		"tails",
		"its side",
	], [
		25,
		25,
		1,
	])}!`),
};