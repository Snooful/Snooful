const channelByType = {
	default: args => args.channel.name,
	direct: args => args.localize("whereami_direct", args.channel.inviter.nickname),
	group: args => args.localize("whereami_group", args.channel.name),
};

module.exports = {
	category: "util",
	description: "Tells you where you are.",
	handler: args => {
		const type = args.channel.customType;
		const place = channelByType[type] ? channelByType[type](args) : channelByType.default(args);

		args.send(args.localize("whereami", place));
	},
	name: "whereami",
};
