module.exports = {
	aliases: [
		"getfaq",
	],
	builder: build => {
		build.positional("id", {
			describe: "The ID of the FAQ message to view.",
			type: "string",
		});
	},
	command: "faq [id]",
	describe: "Shows a prewritten FAQ.",
	handler: args => {
		const faqs = args.settings.get("faq_messages");

		if (args.id) {
			if (faqs && faqs[args.id]) {
				args.send("ℹ️ " + faqs[args.id]);
			} else {
				args.send(args.localize("faq_nonexistent", args.prefix));
			}
		} else {
			args.send(args.localize("faq_unspecified", args.prefix));
		}
	},
};