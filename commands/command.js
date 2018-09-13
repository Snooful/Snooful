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
				args.send([
					"Command: " + args.prefix + command[0],
					command[1] ? "Description: " + command[1] : "",
					command[3].length > 0 ? "Aliases: " + command[3].join(", ") : "",
				].join("\n"));
			} else {
				args.send(args.localize("command_not_found"));
			}
		} else {
			args.send(args.localize("command_unspecified", args.prefix));
		}
	},
};
