const paginate = require("./../../utils/paginate.js");
module.exports = paginate("roles", args => {
	return Object.keys(args.settings.get("roles"));
}, {
	command: {
		description: "Lists the roles.",
	},
	dataType: "roles_datatype",
});