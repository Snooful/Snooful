const paginate = require("./../utils/paginate.js");
module.exports = paginate("commands", args => {
	return args.registry.map(command => `${args.prefix}${command.name}: ${command.description}`);
}, {
	aliases: [
		"help",
		"cmds",
	],
	dataType: "command_datatype",
	description: "List commands and their description.",
});