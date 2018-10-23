module.exports = {
	aliases: [
		"cmd",
		"viewcommand",
		"viewcmd",
		"commandinfo",
		"cmdinfo",
	],
	arguments: [{
		description: "The command to view information about.",
		key: "name",
		type: "string",
	}],
	command: "command",
	describe: "Views information about a command.",
	handler: args => {
		if (args.name) {
			const command = args.registry.filter(cmd => {
				return cmd.name === args.name;
			})[0];

			if (command) {
				const msg = [];

				// Full command template
				msg.push(args.prefix + command.usage());

				// Description
				if (command.description) {
					msg.push(command.longDescription);
				}

				// Aliases
				if (command.aliases && command.aliases.length > 0) {
					if (command.aliases.length === 1) {
						msg.push("Alias: " + args.prefix + command.aliases[0]);
					} else {
						msg.push("Aliases:\n• " + args.prefix + command.aliases.join("\n• " + args.prefix));
					}
				}

				// Arguments
				if (command.arguments && command.arguments.length > 0) {
					const arglist = command.arguments.map(arg => {
						const argtype = args.localize("argument_type" + arg.type) || arg.type;
						const desc = arg.description ? ": " + arg.description : "";

						return `• ${arg.key} (${argtype})` + desc;
					});
					msg.push("Arguments:\n" + arglist.join("\n"));
				}

				// Send it!
				args.send(msg.join("\n\n"));
			} else {
				args.send(args.localize("command_not_found"));
			}
		} else {
			args.send(args.localize("command_unspecified", args.prefix));
		}
	},
};
