const chance = require("chance").Chance();
const dym = require("didyoumean2");

const choices = [
	"rock",
	"paper",
	"scissors",
];
const beats = {
	"rock": "scissors",
	"scissors": "paper",
	"paper": "rock",
};

module.exports = {
	command: "rps [option]",
	describe: "Plays rock-paper-scissors with the bot.",
	builder: build => {
		build.positional("option", {
			describe: "The option you want to play.",
			type: "string",
		});
	},
	handler: args => {
		if (args.option) {
			const yourChoice = dym(args.option, choices, {
				threshold: 0.7,
			});

			if (yourChoice === null) {
				args.send(`You must choose a valid move! Your choices are ${choices.join(", ")}.`);
			} else {
				const msg = "Rock... paper... scissors...\n\n";
				const myChoice = chance.pickone(choices);

				if (myChoice === yourChoice) {
					args.send(msg + `Oh, we both chose ${myChoice}! We should try this again.`);
				} else if (beats[myChoice] === args.option) {
					args.send(msg + `Haha, I beat you; my ${myChoice} beats your ${yourChoice}.`);
				} else {
					args.send(msg + `Darn, you got me there; your ${yourChoice} beats my ${myChoice}.`);
				}
			}
		} else {
			args.send("You need to specify the move you would like to make.");
		}
	},
};