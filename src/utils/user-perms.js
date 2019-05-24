const defaults = [
	"commands.*",
	"-commands.permissions.*",
	"-commands.eventmessages.*",
];

module.exports = (user, roles) => {
	const perms = Object.entries(roles).sort(([ nameA, { priority: priorityA } ], [ nameB, { priority: priorityB }]) => {
		if (priorityA > priorityB) {
			return 1;
		} else if (priorityA < priorityB) {
			return -1;
		} else {
			// Priorities are equal; compare via name
			return nameA.localeCompare(nameB, "en", {
				numeric: true,
			});
		}
	}).map(entry => {
		// We have to do this to get rid of the entry array format...
		return entry[1];
	}).reduce((acc, role) => {
		if (role.users.includes(user) && role.perms.length > 0) {
			return acc.concat([role.perms]);
		} else {
			return acc;
		}
	}, [
		defaults,
	]);
	return perms;
};