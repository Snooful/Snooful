const moment = require("moment-timezone");

module.exports = {
	builder: cmd => {
		cmd.positional("zone", {
			default: "EST",
			describe: "The timezone to get the time in.",
			type: "string",
		});
	},
	command: "time [zone]",
	describe: "Gets the current time.",
	handler: args => {
		const zone = moment.tz.zone(args.zone);
		if (zone === null) {
			args.send("invalid_timezone");
		} else {
			args.send("current_time", zone.name, moment().tz(zone.name).format("MMMM Do YYYY, h:mm:ss A"));
		}
	},
};