const moment = require("moment-timezone");

module.exports = {
	command: "time [zone]",
	describe: "Gets the current time.",
	builder: cmd => {
		cmd.positional("zone", {
			type: "string",
			describe: "The timezone to get the time in.",
			default: "EST",
		});
	},
	handler: args => {
		const zone = moment.tz.zone(args.zone);
		if (zone === null) {
			args.send("That's not a valid time zone.");
		} else {
			args.send(`The current time in ${zone.name} is ${moment().tz(zone.name).format("MMMM Do YYYY, h:mm:ss A")}.`);
		}
	},
};