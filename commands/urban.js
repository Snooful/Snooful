const urbanDict = require("urban-dictionary");

module.exports = {
	command: "urban <term>",
	describe: "Gets a term from Urban Dictionary.",
	handler: async args => {
		if (args.term) {
			const result = await urbanDict.term(args.term);
			const entry = result.entries[0];

			args.send([
				`${entry.word} (${entry.thumbs_up} votes)`,
				"",
				entry.definition,
			].join("\n"));
		} else {
			args.send(`undefined - A subtle hint that you need to tell me which word to define.`);
		}
	}
};