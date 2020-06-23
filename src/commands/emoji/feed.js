const tastyFood = ["🍗", "🌭", "🍔", "🍕", "🌮", "🌯", "🍫", "🍿", "🍩", "🍪", "🍎", "🍏", "🍌", "🍉", "🍇", "🍓", "🍒", "🍍", "🌶", "🧀"];
const chance = require("chance").Chance();

const emojiAPI = require("node-emoji");

module.exports = {
	arguments: [{
		description: "The user to feed. If unspecified, feeds you.",
		key: "user",
		type: "user",
	}],
	category: "emoji",
	description: "Feeds you or a specified user food.",
	handler: args => {
		const emoji = chance.pickone(tastyFood);

		const emojiWhich = emojiAPI.which(emoji);
		const emojiName = emojiWhich ? emojiWhich.toString().replace(/_/g, " ") : args.localize("feed_unknown_type");

		if (args.user && args.user !== "undefined") {
			args.send(args.localize("feed_other", emojiName, emoji, args.user));
		} else {
			// Feed the sender
			args.send(args.localize("feed", emojiName, emoji));
		}
	},
	name: "feed",
};