/* eslint-env mocha */

const assert = require("chai").assert;

const locales = require("./src/locales.json");
const validate = require("locale-code").validate;

const sorted = require("is-sorted");
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
		});
	});
});
