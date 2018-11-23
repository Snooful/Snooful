const altCase = require("alternating-case");

module.exports = {
	aliases: [
		"alternate",
		"alternatecase",
		"altcase",
	],
	arguments: [{
		description: "The message to alternate the case of.",
		key: "text",
		required: true,
		type: "string",
	}],
	description: "Alternates a message's case.",
	handler: args => {
		const transformed = altCase(args.text);
		return args.send(args.localize("alternate_case", transformed));
	},
	name: "mock",
};