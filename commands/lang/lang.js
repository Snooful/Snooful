module.exports = {
	aliases: [
		"language",
		"getlang",
		"getlanguage",
	],
	description: "Gets the current language of Snooful.",
	handler: args => args.send(args.localize("current_language", args.localize("language"), args.prefix)),
	name: "lang",
};