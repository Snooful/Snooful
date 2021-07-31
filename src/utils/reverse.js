try {
	module.exports = require("esrever").reverse;
} catch (_) {
	// Simplified version of what esrever does (not accurate!)
	module.exports = text => {
		return text.split("").reverse().join("");
	};
}
