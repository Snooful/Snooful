const urbanDict = require("urban-dictionary");

module.exports = {
	aliases: [
		"urbandict",
		"urbandictionary",
	],
	builder: build => {
		build.positional("term", {
			describe: "The term to define.",
			type: "string",
		});
	},
	command: "urban [term]",
	describe: "Gets a term from Urban Dictionary.",
	handler: args => {
		if (args.term) {
			urbanDict.term(args.term).then(result => {
				const entry = result.entries[0];
				args.send([
					`${entry.word} ${args.localize("definition_vote_count", entry.thumbs_up)}`,
					"",
					entry.definition,
				].join("\n"));
			}).catch(() => {
				args.send(args.localize("urban_dictionary_no_result"));
			});
		} else {
			args.send(args.localize("urban_dictionary_unspecified_word"));
		}
	},
};
