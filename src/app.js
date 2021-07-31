const getConfig = require("./utils/get-config.js");
const config = getConfig();

const Snooful = require(".");

const snooful = new Snooful(config);
snooful.launch();
