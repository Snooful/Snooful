const parse = require('yargs-parser')

module.exports = class {
    constructor(client, commands) {
        this.client = client;
        this.commands = commands;
    }

    shouldHandleMessage(msg) {
        if (msg.author.username === this.client.username) return false;
        if (!msg.content.startsWith("/")) return false;

        return true;
    }

    handleMessage(msg) {
        if (!this.shouldHandleMessage(msg)) return false;

        const parsed = parse(msg.content.replace("/", ""))._;
        this.commands[parsed[0]].run(msg, parsed.splice(1));
    }
}