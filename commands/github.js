const github = "https://github.com/Snooful/Snooful";

module.exports = {
	aliases: [
		"repo",
		"repository",
		"readme",
		"homepage",
		"website",
	],
	command: "github",
	describe: "Links to the GitHub repository for Snooful.",
	handler: args => args.send(args.localize("github", github)),
};