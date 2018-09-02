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
		if (args.text && args.text.length > 0) {
			args.send("🎙️ " + args.text.join(" "));
		} else {
			args.send("Give me something to echo.");
		}
	},
};