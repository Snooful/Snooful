const chunk = require("lodash.chunk");

module.exports = {
    command: "commands [page]",
	describe: "List commands and their description.",
	builder: builder => {
		builder.positional("page", {
			type: "number",
			describe: "The page number to view.",
			default: 1,
		});
	},
    handler: args => {
		const allCommands = args.usage.map(command => `${args.prefix}${command[0]}: ${command[1]}`).sort();
		const list = chunk(allCommands, 5);

		if (args.page <= list.length && args.page > 0) {
			args.send(`${allCommands.length} commands (page ${args.page} of ${list.length}): \n\n• ` + list[args.page - 1].join("\n• "));
		} else {
			args.send("That's an invalid page number!");
		}
	},
};