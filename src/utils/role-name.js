/**
 * Converts a role name input to a proper role name.
 * @param {string} name the role name input
 * @returns the proper role name
 */
function roleName(name) {
	return name.toString().toLowerCase().replace(/[^a-z]*/g, "");
}
module.exports = roleName;
