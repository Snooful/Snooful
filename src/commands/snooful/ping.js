const { performance } = require("perf_hooks");

module.exports = {
	command: "ping",
	describe: "Measures the response time.",
	handler: args => {
		const initial = performance.now();
		args.send(args.localize("ping_test")).then(() => {
			// Milliseconds
			const time = Math.round(performance.now() - initial);
			args.send(args.localize("ping_result", time);
		});
	},
};
