const chance = require("chance").Chance();

module.exports = {
	category: "chance",
	description: "Tests persistency of the settings system.",
	handler: args => {
		const newNum = chance.integer({
			max: 300,
			min: 1,
		});
		const oldNum = args.settings.get("test");

		if (oldNum === undefined) {
			args.send(args.localize("number_created", newNum));
		} else {
			args.send(args.localize("number_changed", newNum, oldNum));
		}

		args.settings.set("test", newNum);
	},
	name: "dbtest",
};
