module.exports = {
	command: "command <name>",
	describe: "Views information about a command.",
	aliases: [
		"cmd",
		"viewcommand",
		"viewcmd",
		"commandinfo",
		"cmdinfo",
	],
	builder: cmd => {
		cmd.positional("name{
			type: "string",
			describe: "The command to view information about.",
		});
	},
	handler: args => {},
};
