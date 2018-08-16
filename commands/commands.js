module.exports = {
    command: "commands",
    describe: "List all commands.",
    handler: args => args.send("Commands: " + args.usage.join(", ")),
};