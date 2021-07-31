const paginate = require("./../../utils/paginate.js");
module.exports = paginate("userperms", args => args.perms.flat(), {
	command: {
		category: "permissions",
		description: "Lists the permissions a user has.",
	},
	dataType: "permissions_datatype",
});
