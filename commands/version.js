const version = require("./../package.json").version;
const verMsg = `I am running version ${version}! 😄`;

module.exports = {
    command: "version",
    describe: "Shows the version of the bot.",
    handler: args => args.send(verMsg),
};