module.exports = name => {
	return name.toString().toLowerCase().replace(/[^a-z]*/g, "");
};