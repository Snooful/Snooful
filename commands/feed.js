const feedUsers = {
	"haykam821": "🍗 Master, please take this delicious leg of poultry.",
	"DamnImLost": "🗺 I think you need a map rather than food.",
	"BigNig127": "🍎🍏🍎🍏🍎🍏🍎 Take these apples!!!",
	"blackcats666": "🍒 Lucky you! Have a cherry.",
	"JaysRooted": "🍕 Have a slice of pizza, even though it's unhealthy.",
};
const defaultFeed = "🍎 Have an apple! They keep the doctor away.";

module.exports = {
	command: "feed",
	describe: "Feeds you food.",
	handler: args => args.send(feedUsers[args.author] || defaultFeed),
};