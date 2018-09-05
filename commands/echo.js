module.exports = {
	command: "echo [text...]",
	describe: "Repeats a message.",
	aliases: [
		"repeat",
	],
	builder: cmd => {
		cmd.positional("text", {
			type: "string",
			describe: "The message to echo.",
		});
	},
	handler: args => {
		args.send("Sorry, but this command is temporarily disabled until our command restriction system is implemented. Sorry!");
	},
};