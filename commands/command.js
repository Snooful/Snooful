module.exports = {
	aliases: [
		"cmd",
		"viewcommand",
		"viewcmd",
		"commandinfo",
		"cmdinfo",
	],
	builder: cmd => {
		cmd.positional("name", {
			describe: "The command to view information about.",
			type: "string",
		});
	},
	command: "command [name]",
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
				args.send("There is no command with that name.");
			}
		} else {
			args.send(`Please specify a command to view. To see all commands, do ${args.prefix}commands.`);
		}
	},
};
