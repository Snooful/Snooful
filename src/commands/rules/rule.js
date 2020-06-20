const getSubredditErrorKey = require("../../utils/subreddit-error-key.js");

module.exports = {
	arguments: [{
		description: "The rule index to view.",
		key: "rule",
		required: true,
		type: "integer",
	}],
	category: "rules",
	description: "Gets a specific rule.",
	handler: async args => {
		if (!args.chData.subreddit) {
			return args.send(args.localize("rule_not_subreddit"));
		}

		const subredditName = args.chData.subreddit.name;

		try {
			const subreddit = args.reddit.getSubreddit(subredditName);
			const { rules } = await subreddit.getRules();

			const rule = rules[args.rule - 1];
			if (rule === undefined) {
				return args.send(args.localize("rule_nonexistent"));
			}

			const ruleKind = args.localize("rule_kind_" + rule.kind);
			const ruleHeader = rule.short_name + (ruleKind ? " " + ruleKind : "") + ":";

			args.send(ruleHeader + "\n\n" + rule.description);
		} catch (error) {
			if (error.response && error.response.body) {
				args.send(args.localize(getSubredditErrorKey("rule", error.response.body)));
			} else {
				args.send(args.localize("rule_generic_error"));
			}
		}
	},
	name: "rule",
};