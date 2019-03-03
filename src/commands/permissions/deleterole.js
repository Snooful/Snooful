const roleNameify = require("./../../utils/role-name.js");
module.exports = {
	aliases: [
		"eraserole",
	],
	arguments: [{
		key: "role",
		type: "string",
	}],
	category: "permissions",
	description: "Deletes a role.",
	handler: args => {
		const roleName = roleNameify(args.role);
		const roles = args.settings.get("roles");

		if (roles[roleName]) {
			return args.send(args.localize("nonexistent_role"));
		}

		roles[roleName] = undefined;
		args.settings.set("roles", roles);

		args.send(args.localize("role_deleted"));
	},
	name: "deleterole",
};