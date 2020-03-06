const defaults = [
	"commands.*",
	"-commands.permissions.*",
	"-commands.eventmessage.*",
	"commands.eventmessage.contextformats",
];

function userPerms(user, roles) {
	const startingPerms = [defaults];
	if (roles.user && roles.user.perms) {
		startingPerms.push(roles.user.perms);
	}

	const perms = Object.entries(roles).filter(([ name ]) => {
		// Remove user role, just in case
		return name !== "user";
	}).sort(([ nameA, { priority: priorityA = 0 } ], [ nameB, { priority: priorityB = 0 }]) => {
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
	}, startingPerms);
	return perms;
}
module.exports = userPerms;