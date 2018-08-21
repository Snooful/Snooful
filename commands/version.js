module.exports = {
	command: "version",
	describe: "Shows the version of the bot.",
	handler: args => args.send(`I am running version ${args.version}! 😄`),
};