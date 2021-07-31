const validate = require("validate-npm-package-name");
const got = require("got");
const moment = require("moment");

module.exports = {
	aliases: [
		"npmlookup",
	],
	arguments: [{
		description: "The package to look up.",
		key: "package",
		required: true,
		type: "string",
	}],
	category: "packages",
	description: "Looks up a package on the npm registry.",
	handler: args => {
		const validation = validate(args.package);
		if (validation.validForOldPackages) {
			got({
				responseType: "json",
				url: "https://api.npms.io/v2/package/" + encodeURIComponent(args.package),
			}).then(response => {
				if (!(response && response.body && response.body.collected && response.body.collected.metadata)) {
					return args.send(args.localize("npm_package_lookup_error"));
				}

				const metadata = response.body.collected.metadata;
				args.send(args.localize("npm_package_result", {
					author: metadata.author.name,
					description: metadata.description,
					lastPublished: moment(metadata.published).format("MMMM Do YYYY, h:mm:ss A"),
					license: metadata.license,
					link: metadata.links.homepage || metadata.links.repository || metadata.links.npm,
					name: metadata.name,
					version: metadata.version,
				}));
			}).catch(error => {
				if (error && error.body && error.body.code === "NOT_FOUND") {
					args.send(args.localize("npm_package_not_found"));
				} else {
					args.send(args.localize("npm_package_lookup_error"));
				}
			});
		} else {
			args.send(args.localize("invalid_npm_package_name"));
		}
	},
	name: "npm",
};
