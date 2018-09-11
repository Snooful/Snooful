let rev;
try {
	rev = require("esrever").reverse;
} catch (_) {
	rev = text => {
		return text.split("").reverse().join("");
	};
}

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
			args.send(args.localize("reverse", rev(args.text.join(" "))));
		} else {
			args.send(args.localize("unspecified_reverse_message"));
		}
	},
};