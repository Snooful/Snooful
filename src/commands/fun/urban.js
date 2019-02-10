const urbanDict = require("urban-dictionary");
const truncate = require("truncate");

module.exports = {
	aliases: [
		"urbandict",
		"urbandictionary",
	],
	arguments: [{
		description: "The term to define.",
		key: "term",
		type: "string",
	}],
	category: "fun",
	describe: "Gets a term from Urban Dictionary.",
	handler: args => {
		if (args.term) {
			urbanDict.term(args.term).then(result => {
				const entry = result.entries[0];
				args.send([
					`${entry.word} ${args.localize("definition_vote_count", entry.thumbs_up)}`,
					"",
					truncate(entry.definition, 120),
				].join("\n"));
			}).catch(() => {
				args.send(args.localize("urban_dictionary_no_result"));
			});
		} else {
			args.send(args.localize("urban_dictionary_unspecified_word"));
		}
	},
	name: "urban",
};
