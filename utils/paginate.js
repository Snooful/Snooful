const chunk = require("lodash.chunk");

/**
	* Gets data for pagination.
	* @name DataGetFunction
	* @function
	* @param args The arguments from Yargs.
	* @returns *
*/

/**
	* Creates a pagined command using a set of data.
	* @param {string} command The name of the command.
	* @param {string} description The command description.
	* @param {(DataGetFunction|*)} data The data to paginate.
	* @param {string} dataType The type of data being displayed.
*/
module.exports = async (command, description, data = [], dataType = "items") => {
    command: command + " [page]",
	describe: description,
	builder: builder => {
		builder.positional("page", {
			type: "number",
			describe: "The page number to view.",
			default: 1,
		});
	},
    handler: args => {
	    	const resolvedData = [].concat(typeof data === "function" ? await data(args) : data);
	    
		const list = chunk(resolvedData.sort(), 5);

		if (args.page <= list.length && args.page > 0) {
			args.send(`${resolvedData.length} commands (page ${args.page} of ${list.length}): \n\n• ` + list[args.page - 1].join("\n• "));
		} else {
			args.send("That's an invalid page number!");
		}
	},
};
