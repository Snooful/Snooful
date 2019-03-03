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
			users: [],
		};
		args.settings.set("roles", roles);

		args.send(args.localize("role_created"));
	},
	name: "createrole",
};