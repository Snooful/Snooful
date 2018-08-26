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
	command: "birthday [user]",
	describe: "Sings a birthday song to a user!",
	aliases: [
		"cakeday",
		"bday",
	],
	handler: args => {
		if (args.user) {
			args.send(getSong("u/" + args.user, getBirthdayWord()));
		} else {
			args.send(`Happy ${getBirthdayWord()} dear... uh... who again?`);
		}
	},
};