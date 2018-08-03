const chance = require("chance").Chance();

module.exports = {
    command: "matrix",
    describe: "Provides a line of random binary.",
    handler: args => args.message.send(chance.n(chance.integer, 16, {
        min: 0,
        max: 1,
    })),
};