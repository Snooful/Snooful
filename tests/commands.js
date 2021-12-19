/* eslint-env mocha */
const assert = require("chai").assert;

const orangered = require("@snooful/orangered-parser");
orangered.registerDirectory("./src/commands");

// Non-aliases, to prevent clogging
const registry = orangered.getCommandRegistry().filter(({ name, originalName }) => {
	return name === originalName;
});

describe("commands", () => {
	it("have categories", () => {
		registry.forEach(({ category, name }) => {
			assert.isString(category, `${name} does not have a category`);
		});
	});
	it("have short descriptions", () => {
		registry.forEach(({ description, name }) => {
			assert.isString(description, `${name} does not have a description`);

			// Length
			assert(description.length <= 50, `${name}'s description is too long (over 50 characters)`);
			assert(description.length >= 8, `${name}'s description is too short (under 8 characters)`);

			// Capital letter
			const firstLetter = description[0];
			assert.strictEqual(firstLetter.toUpperCase(), firstLetter, `${name}'s description doesn't start with a capital letter`);

			// Period at end
			assert(description.endsWith("."), `${name}'s description doesn't end with a period`);
		});
	});
	it("have concise aliases", () => {
		registry.forEach(({ aliases, name }) => {
			if (Array.isArray(aliases)) {
				assert(aliases.length <= 10, `${name} has too many aliases (over 10)`);
				aliases.forEach(alias => {
					assert(alias.length <= 20, `${name}'s alias (${alias}) is too long (over 20 characters)`);
					assert(alias.length >= 2, `${name}'s alias (${alias}) is too short (under 2 characters)`);
				});
			}
		});
	});
});
