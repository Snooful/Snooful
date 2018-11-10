module.exports = {
	aliases: [
		"about",
	],
	description: "Shows info about this bot.",
	handler: args => args.send(args.localize("info", args.client.nickname, args.prefix)),
	name: "info",
};