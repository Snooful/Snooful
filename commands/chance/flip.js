const chance = require("chance").Chance();

module.exports = {
	command: "flip",
	alias: "coin",
    describe: "Flips a coin.",
    handler: args => args.send(`The coin landed on ${chance.coin()}!`),
};