const chance = require("chance").Chance();

const choices = [
	"rock",
	"paper",
	"scissors",
]

const beats = {
	"rock": "scissors",
	"scissors": "paper",
	"paper": "rock",
};

module.exports = {
	command: "rps [option]",
	describe: "Plays rock-paper-scissors with the bot.",
	handler: args => {
		if (args.option) {
			if (choices.includes(args.option)) {
				const msg = "Rock... paper... scissors...\n\n";
				const myChoice = chance.pickone(choices);

				if (myChoice === args.option) { 
					args.send(msg + `Oh, we both chose ${myChoice}! We should try this again.`);
				} else if (beats[myChoice] === args.option) {
					args.send(msg + `Haha, I beat you; ${myChoice} beats ${args.option}.`);
				} else {
					args.send(msg + `Darn, you got me there; ${args.option} beats ${myChoice}.`);
				}
			} else {
				args.send(`You must choose a valid move! Your choices are ${choices.join(", ")}.`);
			}
		} else {
			args.send("You need to specify the move you would like to make.");
		}
	},
};