function roleName(name) {
	return name.toString().toLowerCase().replace(/[^a-z]*/g, "");
}
module.exports = roleName;