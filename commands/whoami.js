module.exports = {
	command: "whoami",
	describe: "Tells you who you are.",
	handler: args => {
		args.send(`Ah, silly humans, always forgetting their names. I won't throw you under the shade too much this time, though, u/${args.message._sender.nickname}.`);
	},
};