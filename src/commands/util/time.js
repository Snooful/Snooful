const moment = require("moment-timezone");

module.exports = {
	aliases: [
		"currenttime",
	],
	arguments: [{
		default: "EST",
		description: "The timezone to get the time in.",
		key: "zone",
		type: "string",
	}],
	category: "util",
	description: "Gets the current time.",
	handler: args => {
		const zone = moment.tz.zone(args.zone);
		if (zone === null) {
			args.send(args.localize("invalid_timezone"));
		} else {
			args.send(args.localize("current_time", zone.name, moment().tz(zone.name).format("MMMM Do YYYY, h:mm:ss A")));
		}
	},
	name: "time",
};