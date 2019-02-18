const disabledMsg = "Sorry, but this command is temporarily disabled until our command restriction system is implemented. Sorry!";

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
		if (args.text === disabledMsg) {
			args.send("Very funny, but no.");
		} else {
			args.send(disabledMsg);
		}
	},
	name: "echo",
};