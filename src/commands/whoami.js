module.exports = {
	description: "Tells you who you are.",
	handler: args => args.send(args.localize("whoami", args.author)),
	name: "whoami",
};