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
});