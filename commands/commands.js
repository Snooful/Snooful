module.exports = {
    command: "commands",
    describe: "List all commands and their description.",
    handler: args => {
		const list = args.usage.map(command => `${args.prefix}${command[0]}: ${command[1]}`).sort();
		args.send(`Commands (${list.length}): \n- ` + list.join("\n- "));
	},
};