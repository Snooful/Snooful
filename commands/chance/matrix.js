const chance = require("chance").Chance();

module.exports = {
	arguments: [{
		default: 30,
		description: "The length of the matrix line.",
		key: "amount",
		type: "number",
	}],
	category: "chance",
	description: "Provides a line of random binary.",
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
	name: "matrix",
};