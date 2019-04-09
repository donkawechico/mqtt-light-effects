"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var test_1 = require("./test");
function generator(minimum, maximum, increment) {
    var currentValue;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                currentValue = getNextValue((minimum + maximum) / 2, minimum, maximum);
                _a.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 3];
                currentValue = getNextValue(currentValue, minimum, maximum);
                return [4 /*yield*/, currentValue];
            case 2:
                _a.sent();
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/];
        }
    });
}
exports.generator = generator;
;
var candle = function (bulb, minimum, maximum, increment) {
    if (minimum === void 0) { minimum = 0; }
    if (maximum === void 0) { maximum = 255; }
    if (increment === void 0) { increment = 10; }
    test_1.waiting(generator(minimum, maximum, increment), function (lastItem) {
        if (!lastItem.done) {
            bulb.setBrightness(lastItem.value);
        }
    }, 100);
};
exports.default = candle;
function getNextValue(currentBrightness, minimum, maximum) {
    var newMax = currentBrightness + 50;
    var newMin = currentBrightness - 50;
    if (newMax > maximum) {
        newMin -= newMax - maximum;
        newMax = maximum;
    }
    else if (newMin < minimum) {
        newMax += minimum - newMin;
        newMin = minimum;
    }
    return getRandomInt(newMin, newMax);
}
function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * Math.floor(max));
}
// async function candle(
//   minimum: number = 0,
//   maximum: number = 200,
//   increment: number = 10) {
//   return fader(
//     minimum,
//     (currentBrightness) => {
//       let newMax = currentBrightness + 50;
//       let newMin = currentBrightness - 50;
//       if (newMax > maximum) {
//         newMin -= newMax - maximum;
//         newMax = maximum;
//       } else if (newMin < minimum) {
//         newMax += minimum - newMin;
//         newMin = minimum;
//       }
//       return getRandomInt(newMin, newMax);
//     },
//     () => false,
//   );
// }
//# sourceMappingURL=candle.js.map