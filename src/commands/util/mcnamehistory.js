const fetch = require("../../utils/fetch.js");

module.exports = {
	arguments: [{
		description: "The Minecraft user to show history of.",
		key: "user",
		required: true,
		type: "string",
	}],
	category: "util",
	description: "Gets the username history of a Minecraft user.",
	handler: args => {
		return fetch(`https://api.mojang.com/users/profiles/minecraft/${args.user}`, args, {
			got: {
				json: true,
			},
		}).then(profileResult => {
			const id = profileResult.body.id;
			return fetch(`https://api.mojang.com/user/profiles/${id}/names`, args, {
				got: {
					json: true,
				},
			}).then(historyResult => {
				return args.send(args.localize("minecraft_name_history_result", args.user, historyResult.body.map(entry => {
					if (entry.changedToAt) {
						return args.localize("minecraft_name_history_entry", entry.name, new Date(entry.changedToAt).toUTCString());
					} else {
						return entry.name;
					}
				}).join(", ")));
			});
		});
	},
	name: "mcnamehistory",
};
