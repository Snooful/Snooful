module.exports = {
    name: "support",
    describe: "Send support to Snooful's creator.",
    handler: args => {
        args.message.send(`I have recieved the following message from ${args.author.username}:`);
        // args.message.send(args[0]);

        args.message.send("I have contacted my creator for you.");
    }
};