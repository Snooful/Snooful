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

				args.send(idDoesExist ? args.localize("set_faq_message_success_update", args.id) : args.localize("set_faq_message_success_create", args.id));
			} else {
				args.send(args.localize("set_faq_message_unspecified", args.prefix));
			}
		} else {
			args.send(args.localize("set_faq_id_unspecified", args.prefix));
		}
	},
};