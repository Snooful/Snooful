let glc, canUseHash;
try {
	glc = require("git-last-commit");
	canUseHash = true;
} catch (_) {
	canUseHash = false;
}

module.exports = {
	description: "Shows the version of the bot.",
	handler: args => {
		if (canUseHash) {
			glc.getLastCommit((error, git) => {
				if (error) {
					return args.send(args.localize("version", args.version));
				} else {
					args.send(args.localize("version_hash", args.version, git.shortHash));
				}
			});
		} else {
			return args.send(args.localize("version", args.version));
		}
	},
	name: "version",
};
