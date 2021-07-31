module.exports = {
	aliases: [
		"dur",
	],
	arguments: [{
		description: "The duration to convert to seconds.",
		key: "duration",
		required: true,
		type: "duration",
	}],
	category: "util",
	description: "Gets the length of a duration in seconds.",
	handler: args => {
		args.send(args.localize("duration", args.duration / 1000));
	},
	name: "duration",
};
