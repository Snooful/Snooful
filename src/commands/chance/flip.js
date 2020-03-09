const chance = require("chance").Chance();

/**
 * Gets the side of a coin flip.
 * @returns {string} The side the coin landed on.
 */
function getCoinSide() {
	return chance.weighted([
		"heads",
		"tails",
		"side",
	], [
		25,
		25,
		1,
	]);
}

module.exports = {
	alias: "coin",
	category: "chance",
	description: "Flips a coin.",
	handler: args => {
		const sideKey = "coin_flip_side_" + getCoinSide();
		args.send(args.localize("coin_flip_result", args.localize(sideKey)));
	},
	name: "flip",
};