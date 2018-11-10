let glc, canUseHash;
try {
	glc = require("git-last-commit");
	canUseHash = true;
} catch (_) {
	canUseHash = false;
}

const { pify } = require("./../../utils/promisify.js");

module.exports = {
	description: "Shows the version of the bot.",
	handler: args => {
		if (canUseHash) {
			pify(glc.getLastCommit).then(git => {
				args.send(args.localize("version_hash", args.version, git.shortHash));
			}).catch(() => {
				args.send(args.localize("version", args.version))
			});
		} else {
			return args.send(args.localize("version", args.version));
		}
	},
	name: "version",
};
