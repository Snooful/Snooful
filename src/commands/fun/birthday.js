module.exports = {
	aliases: [
		"cakeday",
		"bday",
	],
	arguments: [{
		description: "The user to wish a happy birthday to.",
		key: "user",
		type: "user",
	}, {
		default: true,
		description: "Whether to sing the full birthday song.",
		key: "full-song",
		type: "boolean",
	}],
	category: "fun",
	description: "Sings a birthday song to a user!",
	handler: args => {
		if (args.user) {
			args.send(args.localize(args.fullSong ? "birthday_song" : "birthday_message", args.localize("birthday_type"), "u/" + args.user));
		} else {
			args.send(args.localize("birthday_user_unspecified", args.localize("birthday_type")));
		}
	},
	name: "birthday",
};