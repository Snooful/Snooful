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
	* @param {(DataGetFunction|*)} [data] The data to paginate.
	* @param [opts] Other options.
	* @param {string} [opts.description] The command description.
	* @param {string[]} [opts.aliases] The command's aliases.
	* @param {string} [opts.dataType] The plural word used to describe the data.
	* @param {string} [opts.footer] Text to display after the data as a footer.
	* @param {string} [opts.noItemsMessage] The message to display if there are no items to view.
*/
module.exports = (command, data = [], opts = {}) => {
	const options = Object.assign({
		description: "",
		aliases: [],
		dataType: "items",
		footer: "",
		noItemsMessage: "",
	}, opts);
	
	return {
		command: command + " [page]",
		describe: options.description,
		aliases: options.aliases,
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
			if (resolvedData.length === 0) {
				args.send(options.noItemsMessage || `There are no ${options.dataType} to view.`);
			} else {
				if (args.page <= list.length && args.page > 0) {
					if (Number.isInteger(args.page)) {
						const endText = options.footer ? "\n\n" + options.footer : "";
						args.send(`${resolvedData.length} ${options.dataType} (page ${args.page} of ${list.length}): \n\n• ${list[args.page - 1].join("\n• ")}${endText}`);
					} else {
						args.send("Page numbers must be integers.");
					}
				} else {
					args.send("That's an invalid page number!");
				}
			}
		},
	};
};
