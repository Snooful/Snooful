module.exports = {
    name: "feedback",
    describe: "Send feedback to Snooful's creator.",
    handler: args => {
        args.send(`I have recieved the following message from ${args.message._sender.nickname}:`);
        // args.message.send(args[0]);

        args.send("I have contacted my creator for you.");
    }
};