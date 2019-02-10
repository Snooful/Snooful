module.exports = {
	aliases: [
		"repeat",
	],
	arguments: [{
		description: "The message to echo.",
		key: "text",
		type: "string",
	}],
	category: "fun",
	description: "Repeats a message.",
	handler: args => {
		args.send("Sorry, but this command is temporarily disabled until our command restriction system is implemented. Sorry!");
	},
	name: "echo",
};