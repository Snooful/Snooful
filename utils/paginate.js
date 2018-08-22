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
	* @param {(DataGetFunction|*)} data The data to paginate.
	* @param opts Other options.
	* @param {string} opts.description The command description.
	* @param {string} opts.dataType The plural word used to describe the data.
*/
module.exports = (command, data = [], opts = {}) => {
	const options = Object.assign({
		description: "",
		dataType: "items",
	}, opts);
	
	// legacy var names
	const description = opts.description;
	const dataType = opts.dataType;
	
	return {
		command: command + " [page]",
		describe: description,
		builder: builder => {
			builder.positional("page", {
				type: "number",
				describe: "The page number to view.",
				default: 1,
			});
		},
		handler: async args => {
			const resolvedData = [].concat(typeof data === "function" ? await data(args) : data);
			
			const list = chunk(resolvedData.sort(), 5);

			if (args.page <= list.length && args.page > 0) {
				if (resolvedData.length === 0) {
					args.send(`There are no ${options.dataType} to view.`);
				} else {
					args.send(`${resolvedData.length} ${options.dataType} (page ${args.page} of ${list.length}): \n\n• ` + list[args.page - 1].join("\n• "));
				}
			} else {
				args.send("That's an invalid page number!");
			}
		},
	};
};
