const chance = require("chance").Chance();

function getBirthdayWord() {
	return chance.pickone([
		"birthday",
		"cake day",
	]);
}

function getSong(name, type = "birthday", thirdLine) {
	return [
		`Happy ${type} to you,`,
		`happy ${type} to you!`,
		thirdLine || `Happy ${type}, dear ${name}...`,
		`happy ${type} to you!`,
	].join("\n");
}

module.exports = {
	aliases: [
		"cakeday",
		"bday",
	],
	builder: build => {
		build.positional("user", {
			describe: "The user to wish a happy birthday to.",
			type: "string",
		});
	},
	command: "birthday [user]",
	describe: "Sings a birthday song to a user!",
	handler: args => {
		if (args.user) {
			args.send(getSong("u/" + args.user, getBirthdayWord()));
		} else {
			args.send(`Happy ${getBirthdayWord()} dear... uh... who again?`);
		}
	},
};