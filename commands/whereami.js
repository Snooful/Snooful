module.exports = {
	description: "Tells you where you are.",
	handler: args => args.send(args.localize("whereami", args.channel.name)),
	name: "whereami",
};