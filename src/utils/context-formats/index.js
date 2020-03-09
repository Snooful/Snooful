const ContextFormat = require("./types/default.js");
module.exports.ContextFormat = ContextFormat;

const CustomContextFormat = require("./types/custom.js");
module.exports.CustomContextFormat = CustomContextFormat;

const applyContextFormats = require("./apply.js");
module.exports.applyContextFormats = applyContextFormats;

const getContextFormats = require("./get.js");
module.exports.contextFormats = getContextFormats();