const rpgDiceRoller = require("rpg-dice-roller");
const DiceRoller = new rpgDiceRoller.DiceRoller();

module.exports = {
	command: "customroll [dice]",
	describe: "Rolls dice with a custom notation.",
	aliases: [
		"customdice",
		"croll",
		"cdice",
	],
	handler: args => {
		if (args.dice) {
			const roll = DiceRoller.roll(args.dice);
			if (roll.rolls.length === 0) {
				args.send("That seems to be invalid syntax. Please use proper dice notation.");
			} else {
				args.send(`Dice output: ${roll.rolls[0].join(", ")}.`);
			}
		} else {
			args.send("Specify the dice you want to roll using standard notation.");
		}
	},
};