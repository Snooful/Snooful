module.exports = {
	command: "faq <id>",
	describe: "Shows a prewritten FAQ.",
	aliases: [
		"getfaq",
	],
	handler: args => {
		const faqs = args.settings.get("faq_messages");

		if (args.id) {
			if (faqs && faqs[args.id]) {
				args.send("\u200B" + faqs[args.id]);
			} else {
				args.send(`There is no FAQ with that identifier. For a list of FAQs that exist, type ${args.prefix}listfaq.`);
			}
		} else {
			args.send(`You need to specify an identifier for the FAQ you want to show. To find this list, type ${args.prefix}listfaq.`);
		}
	},
};