const paginate = require("./../utils/paginate.js");
module.exports = paginate("commands", args => {
	return args.usage.map(command => `${args.prefix}${command[0]}: ${command[1]}`);
}, {
	aliases: [
		"help",
		"cmds",
	],
	dataType: "commands",
	description: "List commands and their description.",
});