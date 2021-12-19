const chance = require("chance").Chance();
const snoomojis = require("../../utils/snoomojis.js");

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
