const paginate = require("./../../utils/paginate.js");

module.exports = paginate("langs", args => {
	return Object.keys(args.locales).map(lang => {
		const name = args.localizeO(lang, "language");
		return `${lang} - ${name}`;
	});
}, {
	command: {
		aliases: [
			"languages",
			"listlang",
			"listlangs",
			"listlanguage",
			"listlanguages",
		],
		description: "Lists Snooful's languages.",
		longDescription: "Gives a list of all the languages that Snooful is localized in.",
	},
	dataType: "lang_datatype",
	footer: "langs_footer",
});