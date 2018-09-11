const chance = require("chance").Chance();

module.exports = {
	builder: build => {
		build.positional("amount", {
			default: 30,
			description: "The length of the matrix line.",
			type: "number",
		});
	},
	command: "matrix [amount]",
	describe: "Provides a line of random binary.",
	handler: args => {
		if (args.amount < 1) {
			args.send(args.localize("matrix_amount_too_low"));
		} else if (args.amount > 40) {
			args.send(args.localize("matrix_amount_too_high"));
		} else {
			args.send(chance.n(chance.integer, args.amount, {
				max: 1,
				min: 0,
			}).join(""));
		}
	},
};