const namer = require("color-namer");
const chance = require("chance").Chance();

module.exports = {
	command: "namecolor [color] [count]",
	aliases: [
		"colorname",
	],
	describe: "Names a color.",
	builder: build => {
		build.positional("color", {
			type: "string",
			describe: "The color to name.",
		});
		build.positional("count", {
			type: "number",
			describe: "The amount of names to assign.",
			default: 1,
		});
	},
	handler: args => {
		if (args.color) {
			try {
				const names = namer(args.color).ntc.map(result => result.name);
				if (args.count === 1) {
					args.send(`This color is called ${names[0]}.`);
				} else if (Number.isInteger(args.count)) {
					args.send(`The closest names for this color are ${names.slice(0, args.count).join(", ")}.`);
				} else {
					args.send("Please provide a proper integer for the amount of color names you would like to me to give.");
				}
			} catch {
				const randColor = chance.color({
					format: "hex",
					casing: "upper",
				});
				args.send(`That color is invalid. Please provide a hexadecimal color, such as ${randColor}.`);
			}
		} else {
			args.send("Give me a color to name.");
		}
	},
};
