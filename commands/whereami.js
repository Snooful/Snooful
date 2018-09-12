module.exports = {
	command: "whereami",
	describe: "Tells you where you are.",
	handler: args => args.send(args.localize("whereami", args.channel.name)),
};