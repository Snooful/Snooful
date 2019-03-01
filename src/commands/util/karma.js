module.exports = {
	arguments: [{
		description: "The user to get karma for.",
		key: "user",
		required: true,
		type: "user",
	}],
	category: "util",
	describe: "Gets a user's karma.",
	handler: args => {
		args.reddit.getUser(args.user).fetch().then(user => {
			const totalKarma = user.link_karma + user.comment_karma;
			args.send(args.localize("karma", {
				comment: user.comment_karma.toLocaleString(),
				link: user.link_karma.toLocaleString(),
				name: user.name,
				total: totalKarma.toLocaleString(),
			}));
		}).catch(error => {
			// There has to be a better way...
			if (error.error.error === 404) {
				args.send(args.localize("karma_user_not_found"));
			} else {
				args.send(args.localize("karma_error"));
			}
		});
	},
	name: "karma",
};
