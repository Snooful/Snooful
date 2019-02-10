module.exports = {
	aliases: [
		"about",
	],
	category: "snooful",
	description: "Shows info about this bot.",
	handler: args => args.send(args.localize("info", args.client.nickname, args.prefix)),
	name: "info",
};