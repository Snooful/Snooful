const convert = require("convert-units");

module.exports = {
	arguments: [{
		description: "The value to convert.",
		key: "value",
		required: true,
		type: "number",
	}, {
		description: "The unit to convert from.",
		key: "from",
		required: true,
		type: "string",
	}, {
		description: "The unit to convert to.",
		key: "to",
		required: true,
		type: "string",
	}],
	category: "util",
	description: "Converts between units.",
	handler: args => {
		if (args.from === args.to) {
			return args.send("You cannot convert to the same unit.");
		}

		try {
			const result = convert(args.value).from(args.from).to(args.to);
			args.send(args.localize("conversion_result", args.value, args.from, result, args.to));
		} catch (error) {
			if (error.message.startsWith("Unsupported unit")) {
				return args.send(args.localize("conversion_unit_unsupported"));
			} else if (error.message.startsWith("Cannot convert incompatible measures")) {
				return args.send(args.localize("conversion_units_incompatible", args.from, args.to));
			}

			throw error;
		}
	},
	name: "convert",
};