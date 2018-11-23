module.exports = {
	description: "Reloads all commands.",
	handler: args => {
		args.reload();
		return args.send(args.localize("reload_success"));
	},
	name: "reload",
};