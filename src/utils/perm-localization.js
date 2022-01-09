/**
 * Localizes based on whether a permission query was successful.
 * @param {Object} args The arguments object.
 * @param {string} perm The permission to test for.
 * @param {string} locKey The key to localize, appended with "_no_permission" if permission is missing.
 * @param {...any} vals The values to provide for placeholders.
 * @returns {?string} A string if a permission-based localization could be provided, or null.
 */
function permLocalization(args, perm, locKey, ...vals) {
	const hasPerm = args.testPermission(perm);
	if (hasPerm) {
		vals.usedPrefix = args.usedPrefix;
		return args.localize(locKey, ...vals);
	} else {
		return args.localize(locKey + "_no_permission", ...vals);
	}
}
module.exports = permLocalization;
