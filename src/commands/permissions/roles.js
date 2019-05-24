const paginate = require("./../../utils/paginate.js");
module.exports = paginate("roles", args => {
	return Object.entries(args.settings.get("roles")).map(([ name, role ]) => {
		const ending = " " + args.localize("role_listing_priority", role.priority);

		return name + (name !== "user" ? ending : "");
	});
}, {
	command: {
		category: "permissions",
		description: "Lists the roles.",
	},
	dataType: "roles_datatype",
});