module.exports = {
	arguments: [{
		description: "The ID of the FAQ message to rename.",
		key: "id",
		required: true,
		type: "string",
	}, {
		description: "The new identifier of the FAQ.",
		key: "targetID",
		required: true,
		type: "string",
	}],
	category: "faq",
	description: "Renames a FAQ message.",
	handler: args => {
		if (args.id === args.targetID) {
			return args.send(args.localize("rename_faq_same"));
		}

		const msgs = args.settings.get("faq_messages") || {};

		if (!msgs[args.id]) {
			return args.send(args.localize("rename_faq_nonexistent"));
		}
		if (msgs[args.targetID]) {
			return args.send(args.localize("rename_faq_target_exists"));
		}

		msgs[args.targetID] = msgs[args.id];
		delete msgs[args.id];

		args.settings.set("faq_messages", msgs);
		args.send(args.localize("rename_faq_success"));
	},
	name: "renamefaq",
};
