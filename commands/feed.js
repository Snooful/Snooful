const feedUsers = {
	"haykam821": "🍗 Master, please take this delicious leg of poultry.",
	"DamnImLost": "🗺 I think you need a map rather than food.",
};
const defaultFeed = "🍎 Have an apple! They keep the doctor away.";

module.exports = {
	command: "feed",
	describe: "Feeds you food.",
	handler: args => args.send(feedUsers[author] || defaultFeed),
};