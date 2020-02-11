const locales = require("../locales.json");
const format = require("string-format");
const upsidedown = require("upsidedown");

const chance = new require("chance").Chance();
/**
 * Selects a string.
 * @param {(Object|any[]|*)} msg If an object, selects an key based on the weight value. If an array, picks a random element. Otherwise, converts to a string.
 */
function chanceFormats(msg) {
	if (Array.isArray(msg)) {
		return chance.pickone(msg);
	} else if (msg instanceof Object) {
		return chance.weighted(Object.keys(msg), Object.values(msg));
	} else {
		return msg.toString();
	}
}

/**
 * Formats a string.
 * @param {string} lang A language code. If the key is not localized in this language or this value is not provided, uses en-US.
 * @param {string} key The key to localize.
 * @param {...any} formats The values to provide for placeholders.
 * @return {?string} A string if a localization could be provided, or null.
 */
function localize(lang = "en-US", key = "", ...formats) {
	const thisLocal = lang ? (locales[lang] || locales["en-US"]) : locales["en-US"];
	const msg = thisLocal[key] || locales["en-US"][key];

	if (msg) {
		const msgChosen = chanceFormats(msg);

		const formatted = format(msgChosen, ...formats);
		return lang === "uǝ" ? upsidedown(formatted) : formatted;
	} else {
		return null;
	}
}
module.exports = localize;