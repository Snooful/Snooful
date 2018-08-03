module.exports = {
    command: "commands",
    describe: "List all commands.",
    handler: args => args.message.send("Commands: " + args.usage.join(", ")),
};