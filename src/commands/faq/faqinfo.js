const FAQ = require("../../utils/faq.js");

const moment = require("moment");

module.exports = {
	arguments: [{
		description: "The ID of the FAQ to view information of.",
		key: "id",
		required: true,
		type: "string",
	}],
	category: "faq",
	description: "Shows a FAQ's information.",
	handler: args => {
		const faqs = args.settings.get("faq_messages");
		if (faqs && faqs[args.id]) {
			const faq = new FAQ(faqs[args.id]);

			const unknown = args.localize("faq_information_unknown");
			const formattedDate = moment(faq.lastUpdated).format("MMMM Do YYYY, h:mm:ss A");

			const parts = [
				args.localize("faq_information"),
				"",
				"• " + args.localize("faq_information_length", faq.getLength()),
				"• " + args.localize("faq_information_editors", Object.keys(faq.editors).join(", ") || unknown),
				"• " + args.localize("faq_information_last_updated", isNaN(faq.lastUpdated) ? unknown : formattedDate),
			];

			args.send(parts.join("\n"));
		} else {
			args.send(args.localize("faq_nonexistent", args.usedPrefix));
		}
	},
	name: "faqinfo",
};
