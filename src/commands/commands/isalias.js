module.exports = {
	arguments: [{
		description: "The command to check.",
		key: "command",
		required: true,
		type: "command",
	}],
	description: "Checks if a given command is an alias.",
	handler: args => {
		if (cmd.name === cmd.originalName) {
			args.send(args.localize("isalias_false", args.prefix + cmd.name));
		} else {
			args.send(args.localize("isalias_true", args.prefix + cmd.name, args.prefix + cmd.originalName));
		}
	},
	longDescription: "Checks if the given command is an alias of another. If so, gives the name of the command it is an alias of.",
	name: "isalias",
};
