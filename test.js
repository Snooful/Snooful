/* eslint-env mocha */

const assert = require("chai").assert;

const locales = require("./locales.json");
const verify = require("locale-code").verify;

function eachLocale(callback) {
	Object.keys(locales).forEach(key => {
		callback(locales[key], key);
	});
}

describe("localization", () => {
	it("has english", () => {
		assert.isDefined(locales.en);
	});
	it("locale codes are correct", () => {
		eachLocale((_, key) => {
			assert.isTrue(verify(key));
		});
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
