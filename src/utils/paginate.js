let chunk, properChunk;
try {
	chunk = require("lodash.chunk");
	properChunk = true;
} catch (_) {
	chunk = array => [array];
	properChunk = false;
}

/**
	* Gets data for pagination.
	* @name DataGetFunction
	* @function
	* @param args The arguments from Yargs.
	* @returns *
*/

/**
	* Creates a paginated command using a set of data.
	* If lodash.chunk is not installed, works but without pages.
	* @param {string} command The name of the command.
	* @param {(DataGetFunction|*)} [data] The data to paginate.
	* @param [opts] Other options.
	* @param {Object} [opts.command] Other values for the command.
	* @param {string} [opts.dataType] The localization key for a plural word used to describe the data.
	* @param {string} [opts.footer] Text to display after the data as a footer.
	* @param {string} [opts.noItemsMessage] The localization key for a message to display if there are no items to view.
*/
module.exports = (command, data = [], opts = {}) => {
	const options = {
		command: {},
		dataType: "generic_datatype",
		footer: "",
		noItemsMessage: "",
		...opts,
	};

	return {
		arguments: [{
			default: 1,
			description: "The page index to view.",
			key: "page",
			type: "integer",
		}],
		handler: async args => {
			const resolvedData = [].concat(typeof data === "function" ? await data(args) : data);
			const dataType = args.localize(options.dataType);

			/**
				* An expanded object for use in localization.
			*/
			const expandedArgs = Object.assign(args, {
				type: dataType,
			});

			const list = chunk(resolvedData.sort(), 5);
			if (resolvedData.length === 0) {
				args.send(options.noItemsMessage ? args.localize(options.noItemsMessage, expandedArgs) : args.localize("no_pagination_items", dataType));
			} else if (args.page <= list.length && args.page > 0) {
				if (Number.isSafeInteger(args.page)) {
					const pageOfText = properChunk ? " " + args.localize("page_counter", args.page, list.length) : "";
					const endText = options.footer ? "\n\n" + (args.localize(options.footer, expandedArgs) || options.footer) : "";

					args.send(`${resolvedData.length} ${dataType}${pageOfText}: \n\n• ${list[args.page - 1].join("\n• ")}${endText}`);
				} else {
					args.send(args.localize("page_number_not_integer"));
				}
			} else {
				args.send(args.localize("page_number_invalid"));
			}
		},
		name: command,
		...options.command,
	};
};
