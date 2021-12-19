module.exports = {
	category: "util",
	description: "Counts the number of members in the current channel.",
	handler: args => {
		if (args.channel.customType === "direct" && args.channel.memberCount === 2) {
			return args.send(args.localize("members_direct"));
		}

		// Other channel types have 2 or more members
		args.send(args.localize("members_count", args.channel.memberCount));
	},
	name: "members",
};
