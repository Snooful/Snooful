const paginate = require("./../../utils/paginate.js");
const { contextFormats } = require("./../../utils/context-formats.js");

module.exports = paginate("contextformats", () => {
	return contextFormats.map(contextFormat => {
		return "{" + contextFormat.id.toUpperCase() + "}";
	});
}, {
	command: {
		category: "eventmessage",
		description: "Lists the context formats available for use in event messages.",
	},
	dataType: "context_formats_datatype",
});