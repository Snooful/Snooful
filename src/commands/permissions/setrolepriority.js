const roleNameify = require("./../../utils/role-name.js");
module.exports = {
	aliases: [
		"changerolepriority",
	],
	arguments: [{
		key: "role",
		type: "string",
	}, {
		key: "new-priority",
		max: 100,
		min: -1,
		type: "integer",
	}],
	category: "permissions",
	description: "Sets a role's priority.",
	handler: args => {
		const roleName = roleNameify(args.role);
		const roles = args.settings.get("roles");

		if (roleName === "user") {
			return args.send(args.localize("cannot_set_user_role_priority"));
		} else if (!roles[roleName]) {
			return args.send(args.localize("role_nonexistent"));
		}

		roles[roleName].priority = args.newPriority;
		args.settings.set("roles", roles);

		args.send(args.localize("role_priority_set", args.newPriority));
	},
	longDescription: "Sets the priority of a role. Roles with higher priority override roles with lower priority when there is a permission conflict.",
	name: "setrolepriority",
};
