module.exports = {
	arguments: [{
		description: "The command to check.",
		key: "command",
		required: true,
		type: "command",
	}],
	description: "Checks if a given command is an alias.",
	handler: args => {
		if (args.command.name === args.command.originalName) {
			args.send(args.localize("isalias_false", args.prefix + args.command.name));
		} else {
			args.send(args.localize("isalias_true", args.prefix + args.command.name, args.prefix + args.command.originalName));
		}
	},
	longDescription: "Checks if the given command is an alias of another. If so, gives the name of the command it is an alias of.",
	name: "isalias",
};
