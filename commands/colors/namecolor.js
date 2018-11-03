const namer = require("color-namer");
const chance = require("chance").Chance();

module.exports = {
	aliases: [
		"colorname",
	],
	arguments: [{
		description: "The color to name.",
		key: "color",
		type: "string",
	}, {
		default: 1,
		description: "The amount of names to assign.",
		key: "count",
		type: "integer",
	}],
	category: "colors",
	describe: "Names a color.",
	handler: args => {
		if (args.color) {
			try {
				const names = namer(args.color).ntc.map(result => result.name);
				if (args.count === 1) {
					args.send(args.localize("color_name", names[0]));
				} else if (Number.isInteger(args.count)) {
					if (args.count > 10) {
						args.send(args.localize("color_amount_too_high", args.count));
					} else if (args.count < 1) {
						args.send(args.localize("color_amount_too_low"));
					} else {
						args.send(args.localize("color_names", names.slice(0, args.count).join(", ")));
					}
				} else {
					args.send(args.localize("color_amount_invalid"));
				}
			} catch (error) {
				args.send(args.localize("color_invalid", chance.color({
					casing: "upper",
					format: "hex",
				})));
			}
		} else {
			args.send(args.localize("color_unspecified"));
		}
	},
	name: "namecolor",
};
