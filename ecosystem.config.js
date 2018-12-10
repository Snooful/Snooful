module.exports = {
	apps: [{
		autorestart: true,
		instances: 1,
		name: "Snooful",
		script: "./src/index.js",
	}],
};