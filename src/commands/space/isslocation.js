const fetch = require("./../../utils/fetch.js");
module.exports = {
	aliases: [
		"issposition",
		"isscoordinates",
	],
	description: "Gets the location of the ISS.",
	handler: async args => {
		const response = await fetch("http://api.open-notify.org/iss-now.json", args, {
			contentType: "iss_location_type",
			got: {
				json: true,
			},
		});
		const pos = response.body.iss_position;
		args.send(args.localize("iss_location", pos.latitude, pos.longitude));
	},
	longDescription: "Gives the current coordinates of the International Space Station.",
	name: "isslocation",
};