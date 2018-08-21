module.exports = {
	command: "dbtest",
	describe: "Tests the database.",
	handler: args => {
		const newNum = Math.random();
		const oldNum = args.settings.get("test");

		if (oldNum === undefined) {
			args.send(`The number is ${newNum}. There was no number before.`);
		} else {
			args.send(`The new number is ${newNum}. The old number is ${oldNum}.`);
		}

		args.settings.set("test", newNum);
	},
};