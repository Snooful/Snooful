module.exports = {
	aliases: [
		"setlanguage",
		"changelang",
		"changelanguage",
		"updatelang",
		"updatelanguage",
	],
	builder: build => {
		build.positional("lang", {
			describe: "The language message for Snooful to use in this room/subreddit.",
			type: "string",
		});
	},
	command: "setlang [lang]",
	describe: "Changes the language of Snooful.",
	handler: args => {
		if (args.lang) {
			if (Object.keys(args.locales).includes(args.lang) || args.lang === "uǝ") {
				args.settings.set("lang", args.lang);
				args.send(args.localize("language_updated", args.localize("language")));
			} else {
				args.send(args.localize("language_not_available"));
			}
		} else {
			args.send(args.localize("new_language_unspecified"));
		}
	},
};