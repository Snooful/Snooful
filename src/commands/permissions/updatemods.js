module.exports = {
	aliases: [
		"updatemoderators",
	],
	handler: args => {
		if (!args.chData.subreddit) {
			return args.send(args.localize("mod_update_not_subreddit"));
		}

		const sr = args.chData.subreddit.name;
		args.reddit.getSubreddit(sr).getModerators().then(mod => {
			console.log(mod);
			args.send(args.localize("mod_update_success"));
		}).catch(() => {
			args.send(args.localize("mod_update_failure"));
		});
	},
	name: "updatemods",
	permissionless: true,
};