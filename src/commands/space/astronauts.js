const fetch = require("./../../utils/fetch.js");
const paginate = require("./../../utils/paginate.js");

module.exports = paginate("astronauts", async args => {
	const response = await fetch("http://api.open-notify.org/astros.json", args, {
		contentType: "astronauts_type",
		errorKeyPrefix: "record",
		got: {
			json: true,
		},
	});
	return response.body.people.map(astro => {
		return astro.name + " (" + astro.craft + ")";
	});
}, {
	aliases: [
		"astros",
	],
	dataType: "astronauts_datatype",
	description: "Lists the astronauts in space.",
	longDescription: "Gives a list of astronauts that are currently in space, including the spacecraft that they are on.",
});