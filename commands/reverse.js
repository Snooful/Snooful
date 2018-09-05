const rev = require("esrever");
module.exports = {
	builder: build => {
		build.positional("text", {
			describe: "The text to reverse.",
			type: "string",
		});
	},
	command: "reverse [text...]",
	describe: "Reverses text.",
	handler: args => {
		if (args.text) {
			args.send("Reversing that gives us: " + rev.reverse(args.text.join(" ")));
		} else {
			args.send("Please specify the text to reverse.");
		}
	},
};