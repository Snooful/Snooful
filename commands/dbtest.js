module.exports = {
	command: "dbtest",
	describe: "Tests persistency of the settings system.",
	handler: args => {
		const newNum = Math.random();
		const oldNum = args.settings.get("test");

		if (oldNum === undefined) {
			args.send(args.localize("number_created", newNum));
		} else {
			args.send(args.localize("number_changed", newNum, oldNum));
		}

		args.settings.set("test", newNum);
	},
};