module.exports = {
	arguments: [{
		description: "The category to view information about.",
		key: "name",
		required: true,
		type: "string",
	}],
	category: "commands",
	description: "Views information about a category.",
	handler: args => {
		const categoryCommands = args.registry.filter(command => {
			return command.category === args.name;
		});

		if (categoryCommands.length === 0) {
			return args.send(args.localize("category_nonexistent"));
		}

		args.send(args.localize("category_commands_count", categoryCommands.length));
	},
	name: "category",
};
