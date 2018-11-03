module.exports = {
	category: "snooful",
	describe: "Pongs back at you.",
	handler: args => args.send(args.localize("ping_response")),
	name: "ping",
};