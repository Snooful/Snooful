const chance = require("chance").Chance();

module.exports = {
    command: "matrix",
    describe: "Provides a line of random binary.",
    handler: args => args.send(chance.n(chance.integer, 40, {
    	min: 0,
    	max: 1,
    }).join("")),
};