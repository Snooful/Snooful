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
			const command = args.usage.filter(usage => usage[0].split(" ")[0] === args.name)[0];
			if (command) {
				const msg = [];

				// Full command template
				msg.push(args.prefix + command.toString());

				// Description
				if (command.description) {
					msg.push("Description: " + command.description);
				}

				// Aliases
				if (command.aliases.length > 0) {
					if (command.aliases.length === 1) {
						msg.push("Alias: " + args.prefix + command.aliases[0]);
					} else {
						msg.push("Aliases:\n•" + args.prefix + command.aliases.join("\n•" + args.prefix));
					}
				}

				// Arguments
				if (command.arguments.length > 0) {
					const arglist = command.arguments.map(arg => {
						const argtype = args.localize("argument_type" + arg.type);
						return `• ${arg.name} (${argtype}): ${arg.description}`;
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
