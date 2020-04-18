const convert = require("convert-units");
const paginate = require("./../../utils/paginate.js");

const units = convert().list();
const unitsInfo = units.map(unit => {
	return `${unit.abbr} (${unit.measure}; ${unit.system})`;
});

module.exports = paginate("units", () => {
	return unitsInfo;
}, {
	command: {
		category: "util",
		description: "Lists the available units for conversion.",
	},
	dataType: "units_datatype",
});