const prefix = "/";

const yargs = require("yargs");
yargs.commandDir("commands");

function safeFail() {
    return process.stdout.write("Someone or something failed. This might not be bad.\n");
}
yargs.fail(() => safeFail);
yargs.exitProcess(false);

function handleCommand(command = "") {
    const message = {
        author: {
            username: "haykam821",
        },
        send: console.log,
    };
    const client = {
        username: "Snooful",
    };
    
    if (command.startsWith("/") && message.author.username !== client.username) {
        const unprefixedCmd = command.replace("/", "");

        try {
            yargs.parse(unprefixedCmd, {
                prefix,
                message,
                client,
                usage: yargs.getUsageInstance().getCommands(),
            });
        } catch {
            safeFail();
        }
    }
}
handleCommand("/info hi");