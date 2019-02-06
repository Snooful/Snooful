/**
 * Creates a setter command for event messages.
 */
module.exports = (command, opts = {}) => {
	if (!opts.storageKey) {
		throw new Error(`Missing the storage key for the event message set by command ${command}`);
	}

	const options = {
		longDescription: "Sets the message sent when an event occurs.",
		msgType: "event_message",
		storageKey: "event_message",
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
			const oldMsg = args.settings.get(options.storageKey);
			if (args.eventMessage) {
				if (oldMsg === args.eventMessage) {
					args.send(args.localize(options.msgType + "_update_no_change"));
				} else {
					args.settings.set(options.storageKey, args.eventMessage);
					args.send(args.localize(options.msgType + "_update"));
				}
			} else if (oldMsg === undefined) {
				args.send(args.localize(options.msgType + "_clear_no_change"));
			} else {
				args.settings.clear(options.storageKey);
				args.send(args.localize(options.msgType + "_clear"));
			}
		},
		longDescription: options.longDescription + " {USER} is replaced with the user's name.",
		name: command,
		...options.command,
	};
};