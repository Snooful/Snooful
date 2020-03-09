const paginate = require("./../../utils/paginate.js");
const { contextFormats } = require("../../utils/context-formats");

module.exports = paginate("contextformats", args => {
	return contextFormats.map(contextFormat => {
		const placeholder = "{" + contextFormat.id.toUpperCase() + "}";

		const description = contextFormat.getDescription(args.localize);
		const descriptionSuffix = description ? ": " + description : "";

		return placeholder + descriptionSuffix;
	});
}, {
	command: {
		category: "eventmessage",
		description: "Lists the context formats available for use in event messages.",
	},
	dataType: "context_formats_datatype",
});