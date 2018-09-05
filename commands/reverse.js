let rev;
try {
	rev = require("esrever").reverse;
} catch (error) {
	rev = text => {
		return text.split("").reverse().join("");
	};
}

module.exports = {
	command: "reverse [text...]",
	describe: "Reverses text.",
	builder: build => {
		build.positional("text", {
			describe: "The text to reverse.",
			type: "string",
		});
	},
	handler: args => {
		if (args.text) {
			args.send("Reversing that gives us: " + rev(args.text.join(" ")));
		} else {
			args.send("Please specify the text to reverse.");
		}
	},
};