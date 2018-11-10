const paginate = require("./../../utils/paginate.js");

module.exports = paginate("langs", args => {
	return Object.keys(args.locales).map(lang => {
		const name = args.localizeO(lang, "language");
		return `${lang} - ${name}`;
	});
}, {
	aliases: [
		"languages",
		"listlang",
		"listlangs",
		"listlanguage",
		"listlanguages",
	],
	dataType: "lang_datatype",
	description: "Lists Snooful's languages.",
	footer: "langs_footer",
	longDescription: "Gives a list of all the languages that Snooful is localized in.",
});