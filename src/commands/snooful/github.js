const github = "Snooful/Snooful";
const repoURL = `https://github.com/${github}`;

const get = require("./../../utils/fetch.js");

module.exports = {
	aliases: [
		"repo",
		"repository",
		"readme",
		"homepage",
		"website",
	],
	category: "snooful",
	description: "Links to the GitHub repository for Snooful.",
	handler: args => {
		get(`https://api.github.com/repos/${github}/issues`, args, {
			got: {
				json: true,
			},
			handleErrors: false,
		}).then(response => {
			const trackers = response.body;

			args.send(args.localize("github_contribute", {
				issues: trackers.filter(item => !item.pull_request).length,
				prs: trackers.filter(item => item.pull_request).length,
				url: repoURL,
			}));
		}).catch(() => {
			args.send(args.localize("github", repoURL));
		});
	},
	name: "github",
};