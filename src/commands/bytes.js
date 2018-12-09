const bytes = require("bytes");

module.exports = {
	arguments: [{
		key: "value",
	}, {
		choices: [
			"b",
			"kb",
			"mb",
			"gb",
			"tb",
		],
		key: "unit",
		type: "string",
	}],
	description: "Converts bytes to a unit.",
	handler: args => {
		const convert = bytes.format(args.value, {
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