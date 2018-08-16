function getSong(name, type = "birthday", thirdLine) {
	return [
		`Happy ${type} to you,`,
		`happy ${type} to you!`,
		thirdLine || `Happy ${type}, dear ${name}...`,
		`happy ${type} to you!`,
	].join("\n");
}

module.exports = {
	command: "birthday <user>",
	describe: "Sings a birthday song to a user!",
	handler: async args => {
		if (args.user) {
			const user = await args.sr.getUser(args.user);
			args.send(getSong("u/" + user.name));
		} else {
			args.send("Happy birthday dear... uh... who again?");
		}
	},
};