const feedUsers = {
	BigNig127: [
		"🍎🍏🍎🍏🍎🍏🍎 Take these apples!!!",
		"🍎🍏🍎🍏🍎🍏🍎 This user would like you to not go to the doctor ever in your life!!!",
	],
	DamnImLost: [
		"🗺 I think you need a map, not food.",
		"🗺 I should really get them a map instead of food...",
	],
	JaysRooted: [
		"🍕 Have a slice of pizza, even though it's unhealthy.",
		"🍕 Pizza is great. Yum. Don't eat too much, though.",
	],
	blackcats666: [
		"🍒 Lucky you! Have a cherry.",
		"🍒 Why am I giving a symbol of bad luck a symbol of good luck? It makes no sense!",
	],
	haykam821: [
		"🍗 Master, please take this delicious leg of poultry.",
		"🍗 403, access to feeding master denied.",
	],
};
const defaultFeed = [
	"🍎 Have an apple! They keep the doctor away.",
	"🍎 Let's solve world hunger!",
];

module.exports = {
	builder: build => {
		build.positional("user", {
			describe: "The user to feed. If unspecified, feeds you.",
			type: "string",
		});
	},
	command: "feed [user]",
	describe: "Feeds you or a specified user food.",
	handler: args => {
		if (args.user === undefined || args.user === args.author) {
			if (feedUsers[args.author]) {
				args.send(feedUsers[args.author][0]);
			} else {
				args.send(defaultFeed[0]);
			}
		} else if (feedUsers[args.user]) {
			args.send(feedUsers[args.user][1]);
		} else {
			args.send(defaultFeed[1]);
		}
	},
};