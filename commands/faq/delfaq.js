module.exports = {
	command: "delfaq [id]",
	describe: "Deletes a FAQ message.",
	builder: build => {
		build.positional("id", {
			describe: "The ID of the FAQ to delete.",
			type: "string",
		});
	},
	handler: args => {
		if (args.id) {
			const msgs = args.settings.get("faq_messages") || {};

			if (msgs[args.id] !== undefined) {
				delete msgs[args.id];
				args.settings.set("faq_messages", msgs);

				args.send("That FAQ has been deleted.");
			} else {
				args.send("That FAQ doesn't even exist, silly.");
			}
		} else {
			args.send(`You need to specify a FAQ to delete. To get a list of FAQs, type ${args.prefix}listfaq.`);
		}
	},
};