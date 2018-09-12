const github = "Snooful/Snooful";
const repoURL = `https://github.com/${github}`;

const get = require("./../utils/fetch.js");

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
	handler: args => {
		get(`https://api.github.com/repos/${github}/issues`, args, {
			got: {
				json: true,
			},
		}).then(response => {
			const issues = response.body;
			args.send(args.localize("github_contribute", repoURL, issues.length));
		}).catch(() => {
			args.send(args.localize("github", repoURL));
		});
	},
};