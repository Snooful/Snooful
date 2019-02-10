const bytes = require("bytes");

module.exports = {
	arguments: [{
		key: "value",
		required: true,
		type: "bytes",
	}, {
		choices: [
			"b",
			"kb",
			"mb",
			"gb",
			"tb",
		],
		default: "gb",
		key: "unit",
		type: "string",
	}],
	category: "util",
	description: "Converts bytes to a unit.",
	handler: args => {
		const convert = bytes.format(args.value, {
			decimalPlaces: 4,
			unit: args.unit,
		});

		if (convert === null) {
			args.send(args.localize("bytes_conversion_failed"));
		} else {
			args.send(args.localize("bytes_conversion", convert));
		}
	},
	name: "bytes",
};