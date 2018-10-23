module.exports = {
	arguments: [{
		description: "The command to check.",
		key: "command",
		type: "string",
	}],
	description: "Checks if a given command is an alias.",
	longDescription: "Checks if the given command is an alias of another. If so, gives the name of the command it is an alias of.",
	handler: args => {
		if (args.command) {
			const cmd = args.registry.filter(command => command.name === args.command)[0];
			if (cmd) {
				if (cmd.name === cmd.originalName) {
					args.send(args.localize("isalias_false", args.prefix + cmd.name));
				} else {
					args.send(args.localize("isalias_true", args.prefix + cmd.name, args.prefix + cmd.originalName));
				}
			} else {
				args.send(args.localize("isalias_nonexistent_command"));
			}
		} else {
			args.send(args.localize("isalias_unspecified_command"));
		}
	},
	name: "isalias",
};
