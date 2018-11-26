/* eslint-env mocha */

const assert = require("chai").assert;

const locales = require("./src/locales.json");
const validate = require("locale-code").validate;

describe("localizations", () => {
	Object.keys(locales).forEach(key => {
		const locale = locales[key];
		describe(`${locale.language} (${key}) locale`, () => {
			it("has a correct locale code", () => {
				assert.isTrue(validate(key));
			});
			it("is a non-empty object", () => {
				assert.isObject(value);
				assert.notDeepEqual(value, {});
			});
		});
	});
});
