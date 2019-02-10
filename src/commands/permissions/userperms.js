const paginate = require("./../../utils/paginate.js");
module.exports = paginate("userperms", args => args.perms, {
	command: {
		description: "Lists the permissions a user has.",
	},
	dataType: "permissions_datatype",
});