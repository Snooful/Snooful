const chance = require("chance").Chance();

module.exports = {
    command: "matrix [amount]",
    describe: "Provides a line of random binary.",
    builder: build => {
        build.positional("amount", {
            description: "The length of the matrix line.",
            type: "number",
            default: 30,
        });
    },
    handler: args => {
        if (args.amount < 1) {
            args.send("We need at least some binary. Give me a number bigger than that.");
        } else if (args.amount > 40) {
            args.send("If I give you that much, it'll spam up the channel. Out of courtesy, please give me an amount lower than that.");
        } else {
            args.send(chance.n(chance.integer, args.amount, {
                min: 0,
                max: 1,
            }).join(""));
        }
    },
};
