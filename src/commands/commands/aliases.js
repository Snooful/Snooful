const paginate = require("./../../utils/paginate.js");
module.exports = paginate("aliases", args => {
	return args.registry.filter(command => {
		// Include only aliases
		return command.name !== command.originalName;
	}).map(command => {
		return args.localize("alias_listing", args.usedPrefix + command.name, command.originalName);
	});
}, {
	command: {
		category: "commands",
		description: "Gives a list of aliases and their original name.",
	},
	dataType: "alias_datatype",
});
