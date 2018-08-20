const gitLatestHash = require("git-latest-hash");

module.exports = {
    command: "version",
    describe: "Shows the version of the bot.",
    handler: args => gitLatestHash.getLastCommit((error, git) => {
		if (error) {
			args.send(`I am running version ${args.version}! 😄`);
		} else {
			args.send(`I am running version ${args.version}, with the most recent commit being ${git.shortHash}!`);
	}),
};
