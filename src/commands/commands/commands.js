const paginate = require("./../../utils/paginate.js");
module.exports = paginate("commands", args => {
	return args.registry.filter(command => {
		// Remove aliases
		return command.name === command.originalName;
	}).map(command => {
		return `${args.usedPrefix}${command.name}: ${command.description}`;
	});
}, {
	command: {
		aliases: [
			"help",
			"cmds",
		],
		category: "commands",
		description: "Gives a list of commands.",
		longDescription: "Gives a list of all non-alias commands and their description.",
	},
	dataType: "command_datatype",
});
