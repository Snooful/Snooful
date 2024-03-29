const roleNameify = require("./../../utils/role-name.js");
module.exports = {
	aliases: [
		"revokerole",
	],
	arguments: [{
		key: "user",
		type: "user",
	}, {
		key: "role",
		type: "string",
	}],
	category: "permissions",
	description: "Takes a role from a user.",
	handler: args => {
		const roleName = roleNameify(args.role);
		const roles = args.settings.get("roles");

		if (roleName === "user") {
			return args.send(args.localize("cannot_take_user_role"));
		} else if (!roles[roleName]) {
			return args.send(args.localize("nonexistent_role", args.usedPrefix));
		} else if (!roles[roleName].users.includes(args.user)) {
			return args.send(args.localize("user_doesnt_have_role", args.user));
		}

		roles[roleName].users = roles[roleName].users.filter(user => user === args.user);
		args.settings.set("roles", roles);

		args.send(args.localize("user_taken_role", args.user));
	},
	name: "takerole",
};
