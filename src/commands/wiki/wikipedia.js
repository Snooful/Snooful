const wiki = require("wikijs").default();

module.exports = {
	aliases: [
		"wiki",
	],
	arguments: [{
		description: "The Wikipedia page to get a link to.",
		key: "page",
		required: true,
		type: "string",
	}],
	category: "wiki",
	description: "Gets the link to a Wikipedia page.",
	handler: args => {
		wiki.page(args.page).then(page => {
			args.send(page.raw.title + " - " + page.raw.canonicalurl);
		}).catch(error => {
			if (error.message === "No article found") {
				return args.send(args.localize("wikipedia_article_not_found"));
			}

			args.send(args.localize("wikipedia_error"));
		});
	},
	longDescription: "Gets the link to the given page on Wikipedia, following redirects if present.",
	name: "wikipedia",
};