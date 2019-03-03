const chance = require("chance").Chance();
module.exports = {
	aliases: [
		"hackerman",
	],
	arguments: [{
		default: false,
		description: "Whether to use IPv6 addresses instead of IPv4.",
		key: "ipv6",
		type: "boolean",
	}],
	category: "chance",
	description: "Gets a random IP.",
	handler: args => {
		if (args.ipv6) {
			args.send(args.localize("ipv6_address", chance.ipv6()));
		} else {
			args.send(args.localize("ipv4_address", chance.ip()));
		}
	},
	name: "ipaddress",
};