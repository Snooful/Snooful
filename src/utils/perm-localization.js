module.exports = (args, perm, locKey, ...vals) => {
	const hasPerm = args.testPermission(perm);
	if (hasPerm) {
		vals.prefix = args.prefix;
		return args.localize(locKey, ...vals);
	} else {
		return args.localize(locKey + "_no_permission", ...vals);
	}
}
