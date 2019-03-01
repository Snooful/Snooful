module.exports = {
	arguments: [{
		description: "The user to get karma for.",
		key: "user",
		required: true,
		type: "user",
	}],
	category: "util",
	describe: "Gets a user's karma.",
	handler: async args => {
		const user = await args.reddit.getUser(args.user).fetch();

		const totalKarma = user.link_karma + user.comment_karma;
		args.send(args.localize("karma", {
			comment: user.comment_karma.toLocaleString(),
			link: user.link_karma.toLocaleString(),
			name: user.name,
			total: totalKarma.toLocaleString(),
		}));
	},
	name: "karma",
};
