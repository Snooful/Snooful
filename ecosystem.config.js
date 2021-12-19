/* eslint camelcase: off  */

module.exports = {
	apps: [{
		autorestart: true,
		env: {
			DEBUG: "",
			NODE_ENV: "production",
		},
		env_development: {
			DEBUG: "snooful:*",
			NODE_ENV: "development",
		},
		instances: 1,
		name: "Snooful",
		script: "./src/app.js",
	}],
};
