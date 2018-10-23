const paginate = require("./../utils/paginate.js");
module.exports = paginate("commands", args => {
	return args.registry.filter(command => {
		// Remove aliases
		return command.name === command.originalName;
	}).map(command => {
		return `${args.prefix}${command.name}: ${command.description}`;
	});
}, {
	aliases: [
		"help",
		"cmds",
	],
	dataType: "command_datatype",
	description: "Gives a list of commands List commands and their description.",
});