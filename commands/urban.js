const urbanDict = require("urban-dictionary");

module.exports = {
	command: "urban [term]",
	describe: "Gets a term from Urban Dictionary.",
	handler: args => {
		if (args.term) {
			urbanDict.term(args.term).then(result => {
				const entry = result.entries[0];
				args.send([
					`${entry.word} (${entry.thumbs_up} votes)`,
					"",
					entry.definition,
				].join("\n"));
			}).catch(() => {
				args.send("There was no result for that word on Urban Dictionary!");
			});
		} else {
			args.send(`undefined: A subtle hint that you need to tell me which word to define.`);
		}
	}
};