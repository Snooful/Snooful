const moment = require("moment");

module.exports = {
	aliases: [
		"timeuntil",
		"timesince",
	],
	arguments: [{
		description: "The date to count down to.",
		key: "date",
		required: true,
		type: "string",
	}],
	category: "util",
	description: "Gets the time until/since a date.",
	handler: args => {
		const futureDate = moment(args.date, "MM-DD-YYYY");
		if (!futureDate.isValid()) return args.send("Invalid date");

		const duration = moment.duration(futureDate.diff(Date.now()));

		const beforeNow = futureDate.isBefore(Date.now());
		const localizationKey = beforeNow ? "time_since" : "time_until";

		const durationFormat = duration.humanize();
		const dateFormat = futureDate.format("LL");

		return args.send(args.localize(localizationKey, durationFormat, dateFormat));
	},
	name: "countdown",
};
