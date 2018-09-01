module.exports = {
	command: "listfaq",
	describe: "Lists the identifiers of all the FAQs.",
	handler: args => {
		const ids = Object.keys(args.settings.get("faq_messages") || {});

		if (ids.length > 1) {
			args.send(`There are ${ids.length} FAQs: ${ids.join(", ")}`);
		} else if (ids.length > 0) {
			args.send(`The only FAQ is ${ids[0]}. Create more using ${args.prefix}changefaq.`);
		} else {
			args.send(`There are no FAQs. Create one with ${args.prefix}changefaq!`);
		}
	},
};