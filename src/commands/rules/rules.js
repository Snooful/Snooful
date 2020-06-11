const paginate = require("../../utils/paginate.js");
const getSubredditErrorKey = require("../../utils/subreddit-error-key.js");

module.exports = paginate("rules", async args => {
	if (!args.chData.subreddit) {
		return new Error(args.localize("rules_not_subreddit"));
	}

	const subredditName = args.chData.subreddit.name;

	try {
		const subreddit = args.reddit.getSubreddit(subredditName);
		const { rules } = await subreddit.getRules();

		return rules.map(rule => {
			return rule.short_name;
		});
	} catch (error) {
		if (error.response && error.response.body) {
			return new Error(args.localize(getSubredditErrorKey("rules", error.response.body)));
		}
		return new Error(args.localize("rules_generic_error"));
	}
}, {
	command: {
		category: "rules",
		description: "Lists the rules.",
	},
	dataType: "rules_datatype",
});