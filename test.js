/* eslint-env mocha */

const assert = require("chai").assert;

const locales = require("./src/locales.json");
const validate = require("locale-code").validate;

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

describe("localizations", () => {
	Object.keys(locales).forEach(key => {
		const locale = locales[key];
		describe(`${key} locale`, () => {
			it("has a correct locale code", () => {
				assert.isTrue(validate(key));
			});
			it("is a non-empty object", () => {
				assert.isObject(locale);
				assert.notDeepEqual(locale, {});
			});
			it("has alphabetically-sorted keys", () => {
				assert.isTrue(alphaSorted(Object.keys(locale)));
			});
			
			describe("localization formats", () => {
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
				it("arrays contain only strings", () => {
					arrValues.every(arrValue => {
						return arrValue.every(arrValueElem => {
							return typeof arrValueElem === "string";
						});
					});
				});
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
				it("other values are strings", () => {
					otrValues.every(otrValue => {
						return typeof otrValue === "string";
					});
				});
			});
		});
	});
});
