const rpgDiceRoller = require("rpg-dice-roller");
const DiceRoller = new rpgDiceRoller.DiceRoller();

module.exports = {
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
	command: "customroll",
	describe: "Rolls dice with a custom notation.",
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
};