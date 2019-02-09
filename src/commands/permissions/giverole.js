module.exports = {
	arguments: [{
		key: "user",
		type: "user",
	}, {
		key: "role",
		type: "string",
	}],
	handler: args => {
		const roleName = args.role.toLowerCase().replace(/[^a-z]*/g, "");

		if (args.settings.get("roles") === undefined) {
			args.settings.set("roles", {});
		}

		const roles = args.settings.get("roles");

		if (!roles[roleName]) {
			return args.send(args.localize("nonexistent_role", args.prefix));
		} else if (roles[roleName].users.includes(args.user)) {
			return args.send(args.localize("user_already_has_role", args.user));
		}

		roles[roleName].users.push(args.user);
		args.settings.set("roles", roles);

		args.send(args.localize("user_given_role", args.user));
	},
	name: "giverole",
};