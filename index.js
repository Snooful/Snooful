const rqAll = require("require-all");
const path = require("path");

function send(msg) {

}

class Command {
    constructor(cmd) {
        this.name = cmd.name;
        this.description = cmd.description;
        this.run = cmd.run;
    }

    run() {
        return typeof cmd.run === "function" ? cmd.run() : send(cmd.run);
    }
}

const commands = rqAll({
    dirname: path.resolve("./commands"),
    resolve: commandInfo => new Command(commandInfo),
});

console.log(commands)