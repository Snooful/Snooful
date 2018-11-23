const repoURL = "https://gitlab.com/Snooful/Snooful";

module.exports = {
	description: "Links to the GitLab mirror for Snooful.",
	handler: args => args.send(args.localize("gitlab", repoURL)),
	name: "gitlab",
};