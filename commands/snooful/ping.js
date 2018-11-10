module.exports = {
	command: "ping",
	describe: "Pongs back at you.",
	handler: args => args.send(args.localize("ping_response")),
};