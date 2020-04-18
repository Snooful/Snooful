const convert = require("convert-units");

/**
 * Converts a value to a given unit, or the best unit if unspecified.
 * @param {number} value The value to convert.
 * @param {string} from The unit to convert from.
 * @param {string} [to] The unit to convert to.
 * @returns {number} The converted value.
 */
function convertToUnitOrBest(value, from, to) {
	const fromConvert = convert(value).from(from);
	if (to) {
		return [
			fromConvert.to(to),
			to,
		];
	} else {
		const best = fromConvert.toBest();
		return [
			best.val,
			best.unit,
		];
	}
}

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
		description: "The unit to convert to. If unspecified, picks the best unit.",
		key: "to",
		type: "string",
	}],
	category: "util",
	description: "Converts between units.",
	handler: args => {
		if (args.from === args.to) {
			return args.send(args.localize("conversion_units_same"));
		}

		try {
			const [result, unit] = convertToUnitOrBest(args.value, args.from, args.to);

			if (args.from === unit) {
				return args.send(args.localize("conversion_unit_already_best"));
			}
			args.send(args.localize("conversion_result", args.value, args.from, result, unit));
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