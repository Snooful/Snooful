const namer = require("color-namer");

module.exports = {
	aliases: [
		"colorname",
	],
	arguments: [{
		description: "The color to name.",
		key: "color",
		required: true,
		type: "color",
	}, {
		default: 1,
		description: "The amount of names to assign.",
		key: "count",
		type: "integer",
	}],
	category: "colors",
	describe: "Names a color.",
	handler: args => {
		const names = namer(args.color.hex()).ntc.map(result => result.name);
		if (args.count === 1) {
			args.send(args.localize("color_name", names[0]));
		} else if (args.count > 10) {
			args.send(args.localize("color_amount_too_high", args.count));
		} else if (args.count < 1) {
			args.send(args.localize("color_amount_too_low"));
		} else {
			args.send(args.localize("color_names", names.slice(0, args.count).join(", ")));
		}
	},
	name: "namecolor",
};
