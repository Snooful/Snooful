const chance = require("chance").Chance();

module.exports = {
    command: "flip",
    describe: "Flips a coin.",
    handler: args => args.message.send(`The coin landed on ${chance.coin()}!`),
};