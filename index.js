const rqAll = require("require-all");
const path = require("path");

function send(msg) {
    console.log(msg)
}

class Command {
    constructor(cmd) {
        this.name = cmd.name;
        this.description = cmd.description;
        this.run = cmd.run;
    }
}

const commands = rqAll({
    dirname: path.resolve("./commands"),
    resolve: commandInfo => new Command(commandInfo),
});

const Dispatcher = require("./dispatcher.js");
const chatDispatch = new Dispatcher({
    username: "Snooful",
}, commands);

chatDispatch.handleMessage({
    author: {
        username: "haykam821"
    },
    content: "/info "
});