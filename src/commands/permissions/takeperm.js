const roleNameify = require("./../../utils/role-name.js");
const { validate } = require("@snooful/periwinkle-permissions");

module.exports = {
	aliases: [
		"takepermission",
		"revokeperm",
		"revokepermission",
	],
	arguments: [{
		key: "role",
		type: "string",
	}, {
		key: "permission",
		type: "string",
	}],
	category: "permissions",
	description: "Takes a permission from a role.",
	handler: args => {
		if (!validate(args.permission)) {
			return args.send(args.localize("invalid_permission"));
		}

		const roles = args.settings.get("roles");
		const roleName = roleNameify(args.role);

		if (!roles[roleName]) {
			return args.send(args.localize("nonexistent_role"));
		} else if (roles[roleName].perms.includes(args.permission)) {
			return args.send(args.localize("role_doesnt_have_permission"));
		}

		roles[roleName].perms = roles[roleName].perms.filter(perm => perm === args.permission);
		args.settings.set("roles", roles);

		args.send(args.localize("permission_taken"));
	},
	name: "takeperm",
};
