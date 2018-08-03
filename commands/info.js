module.exports = {
    command: "info",
    describe: "Shows info about this bot.",
    handler: args => args.message.send([
        `I am u/${args.client.username}, ready to help you with anything you need!`,
        `My prefix is ${args.prefix}, so to type a command you just do ${args.prefix}command.`,
        `I was made by haykam821, but please direct all questions and concerns via ${args.prefix}feedback!`,
    ].join("\n")),
};