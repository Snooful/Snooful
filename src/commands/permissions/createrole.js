const roleNameify = require("./../../utils/role-name.js");
module.exports = {
	aliases: [
		"addrole",
		"newrole",
	],
	arguments: [{
		key: "role",
		type: "string",
	}],
	category: "permissions",
	description: "Creates a role.",
	handler: args => {
		const roleName = roleNameify(args.role);
		const roles = args.settings.get("roles");

		if (roles[roleName]) {
			return args.send(args.localize("role_already_exists"));
		}

		roles[roleName] = {
			perms: [],
			priority: 0,
			users: [],
		};
		args.settings.set("roles", roles);

		args.send(args.localize(roleName === "user" ? "user_role_created" : "role_created"));
	},
	name: "createrole",
};
