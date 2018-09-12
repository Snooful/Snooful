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
			args.send(args.localize("birthday_song", args.localize("birthday_type"), "u/" + args.user));
		} else {
			args.send(args.localize("birthday_user_unspecified", args.localize("birthday_type")));
		}
	},
};