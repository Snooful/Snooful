const ContextFormat = require("./types/default.js");
module.exports.ContextFormat = ContextFormat;

const CustomContextFormat = require("./types/custom.js");
module.exports.CustomContextFormat = CustomContextFormat;

const PropertyContextFormat = require("./types/property.js");
module.exports.PropertyContextFormat = PropertyContextFormat;

const applyContextFormats = require("./apply.js");
module.exports.applyContextFormats = applyContextFormats;

const getContextFormats = require("./get.js");
module.exports.contextFormats = getContextFormats();
