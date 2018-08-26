const namer = require("color-namer");

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
			const names = namer(args.color).ntc;
			
			if (args.count === 1) {
				args.send(`This color is called ${names[0]}.`); 
			} else {
				args.send(`The closest names for this color are ${names.slice(0, args.count).join(", ")}.`);
			}
		} else {
			args.send("Give me a color to name.");
		}
	},
};
