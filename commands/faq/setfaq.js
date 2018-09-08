module.exports = {
	builder: build => {
		build.positional("id", {
			describe: "The ID of the FAQ message to change.",
			type: "string",
		});
		build.positional("value", {
			describe: "The message to set the FAQ to.",
			type: "string",
		});
	},
	command: "setfaq [id] [value]",
	describe: "Sets or creates a FAQ message.",
	handler: args => {
		if (args.id) {
			const msgs = args.settings.get("faq_messages") || {};
			const idDoesExist = msgs[args.id] !== undefined;

			if (args.value) {
				msgs[args.id] = args.value;
				args.settings.set("faq_messages", msgs);

				args.send(idDoesExist ? args.localize("faq_message_updated") : args.localize("faq_message_created"));
			} else {
				args.send(args.localize("setfaq_message_unspecified"));
			}
		} else {
			args.send(args.localize("setfaq_id_unspecified", args.prefix));
		}
	},
};