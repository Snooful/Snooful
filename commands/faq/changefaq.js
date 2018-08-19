module.exports = {
	command: "changefaq [id] [value]",
	describe: "Changes, creates, or deletes a FAQ message.",
	builder: build => {
		build.positional("id", {
			describe: "The ID of the FAQ message to change.",
			type: "string",
		});
		build.positional("value", {
			describe: "The message to set. If left blank, deletes the FAQ message.",
			type: "string",
		});
	},
	handler: args => {
		if (args.id) {
			const msgs = args.settings.get("faq_messages") || {}; // this is a temporary name!
			const idDoesExist = msgs[args.id] !== undefined;

			if (args.value) {
				msgs[args.id] = args.value;
				args.settings.set("faq_messages", msgs);
				args.send(idDoesExist ? "That FAQ message has been updated." : "A FAQ message has been created!");
			} else {
				if (idDoesExist) {
					delete msgs[args.id];
					args.settings.set("faq_messages", msgs);

					args.send("That FAQ has been deleted.");
				} else {
					args.send("That FAQ doesn't even exist, silly.");
				}
			}
		} else {
			args.send(`You need to specify a FAQ to change. For a list of them, type ${args.prefix}listfaq.`);
		}
	},
};