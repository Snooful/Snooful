/* eslint-env mocha */
const assert = require("chai").assert;

const locales = require("../src/locales.js");
const { validate, getLanguageCode, getCountryCode } = require("locale-code");

const sorted = require("is-sorted");
/**
 * Checks if an array is alphabetically sorted.
 * @param {string[]} array The array to check if is alphabetically sorted.
 * @returns {boolean} Whether the array is alphabetically sorted.
 */
function alphaSorted(array = []) {
	return sorted(array, (a, b) => {
		return a.localeCompare(b);
	});
}

/**
 * Tests a locale for correct values.
 * @param {Object} locale The locale to test.
 * @returns {undefined}
 */
function localizationFormatTests(locale = {}) {
	// Our main values
	const values = Object.values(locale);

	// Now for each type
	const arrValues = [];
	const objValues = [];
	const otrValues = [];

	// Now fill our per-type value arrays
	values.forEach(value => {
		if (Array.isArray(value)) {
			arrValues.push(value);
		} else if (value.constructor === Object && !!value) {
			objValues.push(value);
		} else {
			otrValues.push(value);
		}
	});

	// Now we can test these
	if (arrValues.length > 0) {
		it("arrays contain only strings", () => {
			arrValues.every(arrValue => {
				return arrValue.every(arrValueElem => {
					return typeof arrValueElem === "string";
				});
			});
		});
	}
	if (objValues.length > 0) {
		describe("object values", () => {
			it("keys are integers", () => {
				Object.keys(objValues).every(intMaybe => {
					return Number.isInteger(intMaybe);
				});
			});
			it("values are strings", () => {
				Object.values(objValues).every(strMaybe => {
					return typeof strMaybe === "string";
				});
			});
		});
	}
	if (otrValues.length > 0) {
		it("other values are strings", () => {
			otrValues.every(otrValue => {
				return typeof otrValue === "string";
			});
		});
	}
}

describe("localizations", () => {
	const englishKeys = Object.keys(locales["en-US"]);
	Object.keys(locales).forEach(key => {
		const locale = locales[key];
		const keys = Object.keys(locale);

		describe(`${key} locale`, () => {
			it("has a correct locale code", () => {
				assert.isTrue(validate(key));
			});
			it("is a non-empty object", () => {
				assert.isObject(locale);
				assert.notDeepEqual(locale, {});
			});
			it("has alphabetically-sorted keys", () => {
				assert.isTrue(alphaSorted(keys));
			});

			if (key !== "en-US") {
				it("has all keys in English localization", () => {
					const keyPercent = Math.floor(keys.length / englishKeys.length * 100);
					assert.strictEqual(keyPercent, 100, `Only has ${keyPercent}% of keys`);
				});
			}

			it("language name is in proper format", () => {
				const langCode = getLanguageCode(key);
				const countryCode = getCountryCode(key).toLowerCase();

				if (langCode !== countryCode) {
					// Regional variant of language
					assert.match(locale.language, /\w+ \(\w+\)/);
				} else {
					// Standard
					assert.match(locale.language, /\w+/);
				}
			});

			describe("localization formats", () => {
				localizationFormatTests(locale);
			});
		});
	});
});
