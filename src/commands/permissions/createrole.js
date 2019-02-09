module.exports = {
	aliases: [
		"addrole",
		"newrole",
	],
	arguments: [{
		key: "role",
		type: "string",
	}],
	handler: args => {
		const roleName = args.role.toLowerCase().replace(/[^a-z]*/g, "");

		if (args.settings.get("roles") === undefined) {
			args.settings.set("roles", {});
		}

		const roles = args.settings.get("roles");

		if (roles[roleName]) {
			return args.send(args.localize("role_already_exists"));
		}

		roles[roleName] = {
			perms: [],
			users: [],
		};
		args.settings.set("roles", roles);

		args.send(args.localize("role_created"));
	},
	name: "createrole",
};