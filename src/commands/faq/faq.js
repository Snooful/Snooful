const FAQ = require("../../utils/faq.js");

module.exports = {
	aliases: [
		"getfaq",
	],
	arguments: [{
		description: "The ID of the FAQ message to view.",
		key: "id",
		type: "string",
	}],
	category: "faq",
	description: "Shows a prewritten FAQ.",
	handler: args => {
		const faqs = args.settings.get("faq_messages");

		if (args.id) {
			if (faqs && faqs[args.id]) {
				const faq = new FAQ(faqs[args.id]);
				args.send("ℹ️ " + faq.getFormattedContent(args));
			} else {
				args.send(args.localize("faq_nonexistent", args.usedPrefix));
			}
		} else {
			args.send(args.localize("faq_unspecified", args.usedPrefix));
		}
	},
	longDescription: "Shows a FAQ message that has been set previously.",
	name: "faq",
};
