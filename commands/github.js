const github = "https://github.com/haykam821/Snooful";

module.exports = {
	name: "github",
	describe: "Links to the GitHub repository for Snooful.",
	handler: args => {
		args.send(`My source code is available at ${github}!`);
	}
};