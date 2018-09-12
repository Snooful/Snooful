module.exports = {
	command: "whoami",
	describe: "Tells you who you are.",
	handler: args => args.send(args.localize("whoami", args.author)),
};