module.exports = {
	arguments: [{
		describe: "The ID of the FAQ to delete.",
		key: "id",
		type: "string",
	}],
	category: "faq",
	description: "Deletes a FAQ message.",
	handler: args => {
		if (args.id) {
			const msgs = args.settings.get("faq_messages") || {};

			if (msgs[args.id] !== undefined) {
				delete msgs[args.id];
				args.settings.set("faq_messages", msgs);

				args.send(args.localize("delete_faq_success"));
			} else {
				args.send(args.localize("delete_faq_nonexistent", args.usedPrefix, args.id));
			}
		} else {
			args.send(args.localize("delete_faq_unspecified", args.usedPrefix));
		}
	},
	name: "delfaq",
};
