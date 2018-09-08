/* eslint-env mocha */

const assert = require("chai").assert;

const locales = require("./locales.json");
function eachLocale(callback) {
	Object.keys(locales).forEach(key => {
		callback(locales[key], key);
	});
}

describe("localization", () => {
	it("has english", () => {
		assert.isDefined(locales.en);
	});
	it("each locale is an object", () => {
		eachLocale(value => {
			assert.isObject(value);
		});
	});
	it("each locale is not empty", () => {
		eachLocale(value => {
			assert.notDeepEqual(value, {});
		});
	});
});