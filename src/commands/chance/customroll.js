const rpgDiceRoller = require("rpg-dice-roller");
const DiceRoller = new rpgDiceRoller.DiceRoller();

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

				args.send(args.localize("custom_roll_results", lands.join(", "), sum));
			}
		} else {
			args.send(args.localize("custom_roll_notation_unspecified"));
		}
	},
	name: "customroll",
};