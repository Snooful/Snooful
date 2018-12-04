const paginate = require("./../../utils/paginate.js");
module.exports = paginate("aliases", args => {
	return args.registry.filter(command => {
		// Include only aliases
		return command.name !== command.originalName;
	}).map(command => {
		return args.localize("alias_listing", args.prefix + command.name, command.originalName);
	});
}, {
	command: {
		description: "Gives a list of aliases and their original name.",
	},
	dataType: "alias_datatype",
});