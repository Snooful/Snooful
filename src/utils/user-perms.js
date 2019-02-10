const defaults = [
	"commands.*",
	"-commands.permissions.*",
	"-commands.eventmessages.*",
];

module.exports = (user, roles) => {
	const perms = Object.values(roles).reduce((acc, role) => {
		if (role.users.includes(user)) {
			return acc.concat(role.perms);
		} else {
			return acc;
		}
	}, []);

	perms.push(...defaults);
	return perms;
};