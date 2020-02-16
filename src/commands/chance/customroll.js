const rpgDiceRoller = require("rpg-dice-roller");
const DiceRoller = new rpgDiceRoller.DiceRoller();

/**
 * The maximum amount of lands to show individually.
 * @type {number}
 */
const maxIndividualLands = 10;

/**
 * Stringifies lands, with a maximum amount of individual lands.
 * @param {number[]} lands The lands.
 * @param {Function} localize The localization function.
 * @returns {string} The stringified lands.
 */
function getIndividualResults(lands, localize) {
	if (lands.length < maxIndividualLands) {
		return lands.join(", ");
	}

	const otherLandsCount = lands.length - maxIndividualLands;
	return lands.slice(0, maxIndividualLands).join(", ") + ", " + localize("custom_roll_other_lands", otherLandsCount);
}

module.exports = {
	aliases: [
		"customdice",
		"croll",
		"cdice",
	],
	arguments: [{
		description: "The dice you want to roll, in standard dice notation.",
		key: "dice",
		type: "string",
	}],
	category: "chance",
	description: "Rolls dice with a custom notation.",
	handler: args => {
		if (args.dice) {
			const roll = DiceRoller.roll(args.dice);
			if (roll.rolls.length === 0) {
				args.send(args.localize("custom_roll_notation_invalid"));
			} else {
				const lands = roll.rolls[0];
				const sum = lands.reduce((prev, curr) => prev + curr);

				const results = getIndividualResults(lands, args.localize);
				args.send(args.localize("custom_roll_results", results, sum));
			}
		} else {
			args.send(args.localize("custom_roll_notation_unspecified"));
		}
	},
	name: "customroll",
};