module.exports = {
	aliases: [
		"about",
	],
	command: "info",
	describe: "Shows info about this bot.",
	handler: args => args.send(args.localize("info", args.client.nickname, args.prefix)),
};