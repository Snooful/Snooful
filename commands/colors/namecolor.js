const namer = require("color-namer");
const chance = require("chance").Chance();

module.exports = {
	aliases: [
		"colorname",
	],
	builder: build => {
		build.positional("color", {
			describe: "The color to name.",
			type: "string",
		});
		build.positional("count", {
			default: 1,
			describe: "The amount of names to assign.",
			type: "number",
		});
	},
	command: "namecolor [color] [count]",
	describe: "Names a color.",
	handler: args => {
		if (args.color) {
			try {
				const names = namer(args.color).ntc.map(result => result.name);
				if (args.count === 1) {
					args.send(`This color is called ${names[0]}.`);
				} else if (Number.isInteger(args.count)) {
					if (args.count > 10) {
						args.send(`I cannot provide you with ${args.count} colors because that would spam this chat.`);
					} else if (args.count < 1) {
						args.send("I need to provide you with at least one name for this color.");
					} else {
						args.send(`The closest names for this color are ${names.slice(0, args.count).join(", ")}.`);
					}
				} else {
					args.send("Please provide a proper integer for the amount of color names you would like to me to give.");
				}
			} catch (error) {
				const randColor = chance.color({
					casing: "upper",
					format: "hex",
				});
				args.send(`That color is invalid. Please provide a hexadecimal color, such as ${randColor}.`);
			}
		} else {
			args.send("Give me a color to name.");
		}
	},
};
