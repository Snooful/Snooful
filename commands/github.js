const github = "https://github.com/Snooful/Snooful";

module.exports = {
	name: "github",
	describe: "Links to the GitHub repository for Snooful.",
	aliases: [
		"repo",
		"repository",
		"readme",
		"homepage",
		"website",
	],
	handler: args => {
		args.send(`My source code is available at ${github}!`);
	}
};
