const paginate = require("./../../utils/paginate.js");

module.exports = paginate("listfaq", args => {
	const messages = args.settings.get("faq_messages") || {};
	return Object.keys(messages).map(key => `${key} (${messages[key].length} characters long)`);
}, {
	category: "faq",
	dataType: "faq_datatype",
	description: "Lists all the FAQs.",
	noItemsMessage: "no_faqs",
});