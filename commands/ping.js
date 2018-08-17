module.exports = {
	command: "ping",
	describe: "Pongs back at you.",
	handler: args => args.send("Pong!"),
};