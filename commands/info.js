module.exports = {
    name: "info",
    description: "Shows info about this bot.",
    run: (msg, args) => {
        process.stdout.write("Des");
        setTimeout(() => {
            process.stdout.write("pa");
            setTimeout(() => {
                process.stdout.write("cito\n");
                setTimeout(() => {}, 1000);
            }, 1000);
        }, 1000);
    }
};