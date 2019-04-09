"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fadeIn_1 = require("./fadeIn");
var fadeOut_1 = require("./fadeOut");
var test_1 = require("./test");
function fadeInOutOnce(from, to, increment) {
    var inFader, outFader, lastIn, lastOut, i, i;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                inFader = fadeIn_1.generator(from, to, increment);
                outFader = fadeOut_1.generator(to, from, increment);
                i = from;
                _a.label = 1;
            case 1:
                if (!(i < to)) return [3 /*break*/, 4];
                lastIn = inFader.next().value;
                return [4 /*yield*/, lastIn];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                i += increment;
                return [3 /*break*/, 1];
            case 4:
                i = from;
                _a.label = 5;
            case 5:
                if (!(i < to)) return [3 /*break*/, 8];
                lastOut = outFader.next().value;
                return [4 /*yield*/, lastOut];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                i += increment;
                return [3 /*break*/, 5];
            case 8: return [2 /*return*/];
        }
    });
}
;
function generator(from, to, increment, times) {
    var e_1, _a, i, _b, _c, x, e_1_1;
    return tslib_1.__generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                i = 0;
                _d.label = 1;
            case 1:
                if (!(times ? i++ < times : true)) return [3 /*break*/, 10];
                _d.label = 2;
            case 2:
                _d.trys.push([2, 7, 8, 9]);
                _b = tslib_1.__values(fadeInOutOnce(from, to, increment)), _c = _b.next();
                _d.label = 3;
            case 3:
                if (!!_c.done) return [3 /*break*/, 6];
                x = _c.value;
                return [4 /*yield*/, x];
            case 4:
                _d.sent();
                _d.label = 5;
            case 5:
                _c = _b.next();
                return [3 /*break*/, 3];
            case 6: return [3 /*break*/, 9];
            case 7:
                e_1_1 = _d.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 9];
            case 8:
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 9: return [3 /*break*/, 1];
            case 10: return [2 /*return*/];
        }
    });
}
exports.generator = generator;
;
var fadeInOut = function (from, to, decrement) {
    test_1.waiting(generator(from, to, decrement), 1000);
};
exports.default = fadeInOut;
//# sourceMappingURL=fadeInOut.js.map