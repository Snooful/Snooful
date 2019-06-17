const validate = require("validate-npm-package-name");
const got = require("got");

module.exports = {
	arguments: [{
		description: "The package to check for existance on the npm registry.",
		key: "package",
		required: true,
		type: "string",
	}],
	category: "packages",
	description: "Checks whether an npm package exists.",
	handler: args => {
		const validation = validate(args.package);
		if (validation.validForOldPackages) {
			got({
				json: true,
				url: "https://api.npms.io/v2/package/" + encodeURIComponent(args.package),
			}).then(response => {
				if (response && response.body && response.body.collected && response.body.collected.metadata) {
					args.send(args.localize("npm_package_exists"));
				} else {
					args.send(args.localize("npm_package_exists_error"));
				}
			}).catch(error => {
				if (error && error.body && error.body.code === "NOT_FOUND") {
					args.send(args.localize("npm_package_not_found"));
				} else {
					args.send(args.localize("npm_package_exists_error"));
				}
			});
		} else {
			args.send(args.localize("invalid_npm_package_name"));
		}
	},
	name: "npmexists",
};