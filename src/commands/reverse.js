const rev = require("./../utils/reverse.js");

module.exports = {
	arguments: [{
		description: "The text to reverse.",
		key: "text",
		type: "string",
	}],
	description: "Reverses text.",
	handler: args => {
		if (args.text) {
			args.send(args.localize("reverse", rev(args.text)));
		} else {
			args.send(args.localize("unspecified_reverse_message"));
		}
	},
	name: "reverse",
};
