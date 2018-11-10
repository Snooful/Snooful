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
		required: true,
		type: "command",
	}],
	description: "Views information about a command.",
	handler: args => {
		const command = args.name;
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
				msg.push(args.localize("command_aliases_single") + " " + args.prefix + command.aliases[0]);
			} else {
				msg.push(args.localize("command_aliases") + "\n• " + args.prefix + command.aliases.join("\n• " + args.prefix));
			}
		}

		// Arguments
		if (command.arguments && command.arguments.length > 0) {
			const arglist = command.arguments.map(arg => {
				const argtype = args.localize("argument_type_" + arg.type) || arg.type;
				const desc = arg.description ? ": " + arg.description : "";

				return `• ${arg.key} (${argtype})` + desc;
			});
			msg.push(args.localize("command_arguments") + "\n" + arglist.join("\n"));
		}

		// Send it!
		args.send(msg.join("\n\n"));
	},
	name: "command",
};
