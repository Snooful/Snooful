const paginate = require("../../utils/paginate.js");

module.exports = paginate("rules", async args => {
	if (!args.chData.subreddit) {
		return [];
	}

	const subredditName = args.chData.subreddit.name;
	const subreddit = args.reddit.getSubreddit(subredditName);

	const rules = await subreddit.getRules().catch(() => {
		return {
			rules: [],
		};
	});
	return rules.rules.map(rule => {
		return rule.short_name;
	});
}, {
	command: {
		category: "rules",
		description: "Lists the rules.",
	},
	dataType: "rules_datatype",
});