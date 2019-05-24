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
		type: "integer",
	}],
	category: "permissions",
	description: "Sets a role's priority.",
	longDescription: "Sets the priority of a role. Roles with higher priority override roles with lower priority when there is a permission conflict.",
	handler: args => {
		const roleName = roleNameify(args.role);
		const roles = args.settings.get("roles");

		if (!roles[roleName]) {
			return args.send(args.localize("role_nonexistent"));
		}

		roles[roleName].priority = args.newPriority;
		args.settings.set("roles", roles);

		args.send(args.localize("role_priority_set", args.newPriority));
	},
	name: "setrolepriority",
};