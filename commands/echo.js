module.exports = {
	command: "echo <text...>",
	describe: "Repeats a message.",
	builder: cmd => {
		cmd.positional("text", {
			type: "string",
			describe: "The message to echo.",
		});
	},
	handler: args => args.send("\u200B" + args.text.join(" ")),
};