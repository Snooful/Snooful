module.exports = {
	aliases: [
		"repeat",
	],
	builder: cmd => {
		cmd.positional("text", {
			describe: "The message to echo.",
			type: "string",
		});
	},
	command: "echo [text...]",
	describe: "Repeats a message.",
	handler: args => {
		args.send("Sorry, but this command is temporarily disabled until our command restriction system is implemented. Sorry!");
	},
};