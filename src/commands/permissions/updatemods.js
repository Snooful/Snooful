const getSubredditErrorKey = require("../../utils/subreddit-error-key.js");

module.exports = {
	aliases: [
		"updatemoderators",
	],
	category: "permissions",
	description: "Updates the moderator list.",
	handler: args => {
		if (!args.chData.subreddit) {
			return args.send(args.localize("mod_update_not_subreddit"));
		}

		const sr = args.chData.subreddit.name;
		args.reddit.getSubreddit(sr).getModerators().then(mods => {
			args.settings.set("mods", mods.map(mod => mod.name));
			args.send(args.localize("mod_update_success"));
		}).catch(error => {
			if (error.response && error.response.body) {
				args.send(args.localize(getSubredditErrorKey("mod_update", error.response.body)));
			} else {
				args.send(args.localize("mod_update_generic_error"));
			}
		});
	},
	name: "updatemods",
	permissionless: true,
};
