const chance = require("chance").Chance();

/**
 * Gets a random hackerman statement
 */
function getValue() {
    return chance.pickone([
        `I'm in.`,
        `Too late, I just connected to your IP, ${chance.ip()}...`,
        `Oh no, this IP is encrypted!! We can never hack into ${chance.ipv6()}!!!`,
    ]);
}

module.exports = {
    command: "hackerman",
    describe: "Transform yourself into Hackerman!",
    handler: args => args.send(getValue()),
};