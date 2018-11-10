let glc, canUseHash;
try {
	glc = require("git-last-commit");
	canUseHash = true;
} catch (_) {
	canUseHash = false;
}

const { pify } = require("./../../utils/promisify.js");

function sendVersion(args) {
	return args.send(args.localize("version", args.version));
}

module.exports = {
	description: "Shows the version of the bot.",
	handler: args => {
		if (canUseHash) {
			pify(glc.getLastCommit).then(git => {
				args.send(args.localize("version_hash", args.version, git.shortHash));
			}).catch(() => {
				sendVersion(args);
			});
		} else {
			sendVersion(args);
		}
	},
	name: "version",
};
