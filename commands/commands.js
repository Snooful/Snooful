const paginate = require("./../utils/paginate.js");
module.exports = paginate("commands", "List commands and their description.", args => {
	return args.usage.map(command => `${args.prefix}${command[0]}: ${command[1]}`);
}, "commands");
