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
	description: "Creates a role.",
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