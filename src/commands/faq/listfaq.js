const paginate = require("./../../utils/paginate.js");

module.exports = paginate("listfaq", args => {
	const messages = args.settings.get("faq_messages") || {};
	return Object.keys(messages).map(key => `${key} (${messages[key].length} characters long)`);
}, {
	command: {
		description: "Lists all the FAQs.",
	},
	dataType: "faq_datatype",
	noItemsMessage: "no_faqs",
});