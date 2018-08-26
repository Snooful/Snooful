const paginate = require("./../utils/paginate.js");
module.exports = paginate("commands", args => {
	return args.usage.map(command => `${args.prefix}${command[0]}: ${command[1]}`);
}, {
	description: "List commands and their description.",
  aliases: [
		"help",
		"cmds",
	],
	dataType: "commands",
});