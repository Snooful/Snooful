let glc, canUseHash;
try {
	glc = require("git-last-commit");
	canUseHash = true;
} catch (_) {
	canUseHash = false;
}

function sendVersion(args) {
	return args.send(args.localize("version", args.version));
}

module.exports = {
	command: "version",
	describe: "Shows the version of the bot.",
	handler: args => {
		if (canUseHash) {
			glc.getLastCommit((error, git) => {
				if (error) {
					sendVersion(args);
				} else {
					args.send(args.localize("version_hash", args.version, git.shortHash));
				}
			});
		} else {
			sendVersion(args);
		}
	},
};
