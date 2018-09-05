module.exports = {
	name: "whereami",
	describe: "Tells you where you are.",
	handler: args => {
		args.send(`You are in ${args.channel.name}.`);
	},
};