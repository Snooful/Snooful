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
	builder: build => {
		build.positional("dice", {
			describe: "The dice you want to roll, in standard RPG format.",
			type: "string",
		});
	},
	handler: args => {
		if (args.dice) {
			const roll = DiceRoller.roll(args.dice);
			if (roll.rolls.length === 0) {
				args.send("That seems to be invalid syntax. Please use proper dice notation.");
			} else {
				const lands = roll.rolls[0];
				const sum = lands.reduce((prev, curr) => prev + curr);

				args.send(`Dice output: ${lands.join(", ")}, with a total of ${sum}.`);
			}
		} else {
			args.send("Specify the dice you want to roll using standard notation.");
		}
	},
};