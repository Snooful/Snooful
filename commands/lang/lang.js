module.exports = {
	aliases: [
		"language",
		"getlang",
		"getlanguage",
	],
	command: "lang",
	describe: "Gets the current language of Snooful.",
	handler: args => args.send(args.localize("current_language", args.localize("language"), args.prefix)),
};