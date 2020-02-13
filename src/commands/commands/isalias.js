module.exports = {
	arguments: [{
		description: "The command to check.",
		key: "command",
		required: true,
		type: "command",
	}],
	category: "commands",
	description: "Checks if a given command is an alias.",
	handler: args => {
		if (args.command.name === args.command.originalName) {
			args.send(args.localize("isalias_false", args.usedPrefix + args.command.name));
		} else {
			args.send(args.localize("isalias_true", args.usedPrefix + args.command.name, args.usedPrefix + args.command.originalName));
		}
	},
	longDescription: "Checks if the given command is an alias of another. If so, gives the name of the command it is an alias of.",
	name: "isalias",
};
