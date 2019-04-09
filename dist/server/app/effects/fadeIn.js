"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// import { LightEffect } from 'app/components/EffectBulb/EffectBulb';
// import { getClient } from 'app/components/MqttClient/MqttClient';
var test_1 = require("./test");
// const client = getClient();
function generator(from, to, increment) {
    var i;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i = from;
                _a.label = 1;
            case 1:
                if (!(i < to)) return [3 /*break*/, 4];
                return [4 /*yield*/, i];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                i += increment;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}
exports.generator = generator;
;
var fadeIn = function (from, to, increment) {
    test_1.waiting(generator(from, to, increment), 1000);
};
exports.default = fadeIn;
//# sourceMappingURL=fadeIn.js.map