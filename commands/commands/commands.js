const paginate = require("./../../utils/paginate.js");
module.exports = paginate("commands", args => {
	return args.registry.toArray().filter(command => {
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
	description: "Gives a list of commands.",
	longDescription: "Gives a list of all non-alias commands and their description.",
});