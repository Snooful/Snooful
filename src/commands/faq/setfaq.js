module.exports = {
	arguments: [{
		description: "The ID of the FAQ message to change.",
		key: "id",
		type: "string",
	}, {
		description: "The message to set the FAQ to.",
		key: "value",
		type: "string",
	}],
	category: "faq",
	description: "Sets or creates a FAQ message.",
	handler: args => {
		if (args.id) {
			const msgs = args.settings.get("faq_messages") || {};
			const idDoesExist = msgs[args.id] !== undefined;

			if (args.value) {
				const editors = {
					...msgs && msgs[args.id] && msgs[args.id].editors,
					[args.sender.nickname]: args.sender.userId,
				};
				msgs[args.id] = {
					content: args.value,
					editors,
					lastUpdated: Date.now(),
				};
				args.settings.set("faq_messages", msgs);

				args.send(idDoesExist ? args.localize("set_faq_message_success_update", args.id) : args.localize("set_faq_message_success_create", args.id));
			} else {
				args.send(args.localize("set_faq_message_unspecified", args.usedPrefix));
			}
		} else {
			args.send(args.localize("set_faq_id_unspecified", args.usedPrefix));
		}
	},
	name: "setfaq",
};
