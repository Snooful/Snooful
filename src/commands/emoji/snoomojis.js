const paginate = require("../../utils/paginate.js");
const snoomojis = require("../../utils/snoomojis.js");

module.exports = paginate("snoomojis", () => {
	return snoomojis.map(snoomoji => {
		return snoomoji[0] + snoomoji.slice(1).replace(/_/g, " ");
	});
}, {
	command: {
		category: "emoji",
		description: "Gives a list of snoomojis.",
	},
	dataType: "snoomoji_datatype",
});