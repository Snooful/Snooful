const paginate = require("../../utils/paginate.js");
const FAQ = require("../../utils/faq.js");

module.exports = paginate("listfaq", args => {
	const faqs = args.settings.get("faq_messages") || {};
	return Object.keys(faqs).map(key => {
		const faq = new FAQ(faqs[key]);
		return `${key} (${faq.getLength()} characters long)`;
	});
}, {
	command: {
		category: "faq",
		description: "Lists all the FAQs.",
	},
	dataType: "faq_datatype",
	noItemsMessage: "no_faqs",
});