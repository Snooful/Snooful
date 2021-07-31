const paginate = require("./../../utils/paginate.js");

module.exports = paginate("moderators", args => {
	return args.settings.get("mods");
}, {
	command: {
		aliases: [
			"mods",
		],
		category: "permissions",
		description: "Lists the moderators of this subreddit.",
	},
	dataType: "moderator_datatype",
	sorted: false,
});
