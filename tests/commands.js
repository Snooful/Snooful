/* eslint-env mocha */
const assert = require("chai").assert;

const orangered = require("@snooful/orangered-parser");
orangered.registerDirectory("./src/commands");

// Non-aliases, to prevent clogging
const registry = orangered.getCommandRegistry().filter(cmd => {
	return cmd.name === cmd.originalName;
});

describe("commands", () => {
	it("have categories", () => {
		registry.forEach(cmd => {
			assert.isString(cmd.category, `${cmd.name} does not have a category`);
		});
	});
	it("have short descriptions", () => {
		registry.forEach(cmd => {
			assert.isString(cmd.description, `${cmd.name} does not have a description`);

			// Length
			assert(cmd.description.length < 50, `${cmd.name}'s description is too long`);
			assert(cmd.description.length > 8, `${cmd.name}'s description is too short`);

			// Capital letter
			const firstLetter = cmd.description[0];
			assert.strictEqual(firstLetter.toUpperCase(), firstLetter, `${cmd.name}'s description doesn't start with a capital letter`);

			// Period at end
			assert(cmd.description.endsWith("."), `${cmd.name}'s description doesn't end with a period`);
		});
	});
});