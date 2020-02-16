/**
 * Creates a setter command for event messages.
 * @param {string} command The name of the command.
 * @param {Object} [opts] The command's options.
 * @returns {Object} The setter command object.
 */
module.exports = (command, opts = {}) => {
	if (!opts.storageKey) {
		throw new Error(`Missing the storage key for the event message set by command ${command}`);
	}

	const options = {
		longDescription: "Sets the message sent when an event occurs.",
		msgType: "event_message",
		...opts,
	};

	return {
		arguments: [{
			description: "The new message.",
			key: "event-message",
			type: "string",
		}],
		description: "Sets the event message.",
		handler: args => {
			const msgTypeLocal = args.localize(options.msgType) || args.localize("event_message");

			const oldMsg = args.settings.get(options.storageKey);
			if (args.eventMessage) {
				if (oldMsg === args.eventMessage) {
					args.send(args.localize("event_message_update_no_change", msgTypeLocal));
				} else {
					args.settings.set(options.storageKey, args.eventMessage);
					args.send(args.localize("event_message_update", msgTypeLocal));
				}
			} else if (oldMsg === undefined) {
				args.send(args.localize("event_message_clear_no_change", msgTypeLocal));
			} else {
				args.settings.clear(options.storageKey);
				args.send(args.localize("event_message_clear", msgTypeLocal));
			}
		},
		longDescription: options.longDescription + " {USER} is replaced with the user's name, and {WHEN} is replaced with when the event occurred.",
		name: command,
		...options.command,
	};
};