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

				args.send(idDoesExist ? "That FAQ message has been updated." : "A FAQ message has been created!");
			} else {
				args.send("You need to specify the message for the FAQ.");
			}
		} else {
			args.send(`You need to specify a FAQ to change. To get a list of FAQs, type ${args.prefix}listfaq.`);
		}
	},
};