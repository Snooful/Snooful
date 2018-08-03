const prefix = "/";

const yargs = require("yargs");
yargs.commandDir("commands");

yargs.fail(() => {
    process.stdout.write("A user did an oops.\n");
});

yargs.check(argv => argv.message.author.username !== argv.client.username);

function handleCommand(command = "") {
    if (command.startsWith("/")) {
        const unprefixedCmd = command.replace("/", "");

        yargs.parse(unprefixedCmd, {
            prefix,
            message: {
                author: {
                    username: "haykam821",
                },
                send: console.log,
            },
            client: {
                username: "Snooful",
            },
        });
    }
}
handleCommand("/info hi");