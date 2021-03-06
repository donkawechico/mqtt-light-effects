"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
dotenv.config({ path: '.env.local' });
dotenv.load();
function debug(message, obj) {
    var DEBUG = process.env.DEBUG || false;
    if (DEBUG) {
        if (obj) {
            console.log("DEBUG: " + message, obj);
        }
        else {
            console.log("DEBUG: " + message);
        }
    }
}
exports.debug = debug;
exports.ZERO_BRIGHTNESS = '{"state":"OFF","brightness":0,"white_value":0,"color_temp":154,"color":{"r":255,"g":136,"b":12},"gamma":true}';
//# sourceMappingURL=index.js.map