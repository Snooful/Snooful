module.exports = {
	aliases: [
		"updatemoderators",
	],
	category: "permissions",
	handler: args => {
		if (!args.chData.subreddit) {
			return args.send(args.localize("mod_update_not_subreddit"));
		}

		const sr = args.chData.subreddit.name;
		args.reddit.getSubreddit(sr).getModerators().then(mods => {
			args.settings.set("mods", mods.map(mod => mod.name));
			args.send(args.localize("mod_update_success"));
		}).catch(() => {
			args.send(args.localize("mod_update_failure"));
		});
	},
	name: "updatemods",
	permissionless: true,
};