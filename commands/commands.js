const paginate = require("./../utils/paginate.js");
module.exports = paginate("commands", args => {
	return args.usage.map(command => `${args.prefix}${command[0]}: ${command[1]}`);
}, {
	aliases: [
		"help",
		"cmds",
	],
	dataType: "command_datatype",
	description: "List commands and their description.",
});