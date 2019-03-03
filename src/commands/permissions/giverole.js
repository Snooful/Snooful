const roleNameify = require("./../../utils/role-name.js");
module.exports = {
	arguments: [{
		key: "user",
		type: "user",
	}, {
		key: "role",
		type: "string",
	}],
	category: "permissions",
	description: "Gives a role to a user.",
	handler: args => {
		const roleName = roleNameify(args.role);
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