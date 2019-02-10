const url = require("url-escape-tag");
module.exports = {
	arguments: [{
		description: "The query for LMGTFY.",
		key: "query",
		type: "string",
	}],
	description: "Gets a link to the LMGTFY service.",
	handler: args => args.send(url`http://lmgtfy.com/?q=${args.query}`),
	name: "lmgtfy",
};