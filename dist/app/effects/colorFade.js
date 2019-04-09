"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var test_1 = require("./test");
function getIncrementNeeded(from, to, steps) {
    var diff = to - from;
    return Math.ceil(diff / steps);
}
function validateColor(color) {
    return {
        r: validateSingleColor(color.r),
        g: validateSingleColor(color.g),
        b: validateSingleColor(color.b),
    };
}
function validateSingleColor(singleColorValue) {
    if (singleColorValue >= 255) {
        singleColorValue = 255;
    }
    else if (singleColorValue <= 0) {
        singleColorValue = 0;
    }
    return singleColorValue;
}
function generator(from, to, steps) {
    var rInc, gInc, bInc, rNext, gNext, bNext, i, nextColor;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                rInc = getIncrementNeeded(from.r, to.r, steps);
                gInc = getIncrementNeeded(from.g, to.g, steps);
                bInc = getIncrementNeeded(from.b, to.b, steps);
                rNext = from.r;
                gNext = from.g;
                bNext = from.b;
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i <= steps)) return [3 /*break*/, 4];
                rNext += rInc;
                gNext += gInc;
                bNext += bInc;
                nextColor = validateColor({ r: rNext, g: gNext, b: bNext });
                console.log("next color:", nextColor);
                return [4 /*yield*/, nextColor];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}
exports.generator = generator;
;
var colorFade = function (bulb, from, to, steps) {
    test_1.waiting(generator(from, to, steps), function (lastItem) {
        if (!lastItem.done) {
            bulb.setColor(lastItem.value);
        }
    }, 100);
};
exports.default = colorFade;
//# sourceMappingURL=colorFade.js.map