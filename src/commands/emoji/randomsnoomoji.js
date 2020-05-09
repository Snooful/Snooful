const chance = require("chance").Chance();

const snoomojis = [
	"cake",
	"cat_blep",
	"doge",
	"downvote",
	"hamster",
	"illuminati",
	"kappa",
	"karma",
	"orly",
	"partyparrot",
	"pupper",
	"redditgold",
	"sloth",
	"snoo",
	"snoo_angry",
	"snoo_biblethump",
	"snoo_dealwithit",
	"snoo_disapproval",
	"snoo_facepalm",
	"snoo_feelsbadman",
	"snoo_feelsgoodman",
	"snoo_give_upvote_pride",
	"snoo_heart_eyes_pride",
	"snoo_hearteyes",
	"snoo_hug",
	"snoo_joy",
	"snoo_putback",
	"snoo_sad",
	"snoo_scream",
	"snoo_shrug",
	"snoo_simple_smile",
	"snoo_smile",
	"snoo_surprised",
	"snoo_tableflip",
	"snoo_thoughtful",
	"snoo_tongue",
	"snoo_trollface",
	"snoo_wink",
	"upvote",
	"upvote_pride",
];

module.exports = {
	category: "emoji",
	description: "Sends a random snoomoji.",
	handler: async args => {
		await args.send(args.localize("random_snoomoji_result"));
		args.channel.sendUserMessage("", JSON.stringify({
			v1: {
				snoomoji: chance.pickone(snoomojis),
			},
		}), () => {
			// Mandatory callback
		});
	},
	name: "randomsnoomoji",
};