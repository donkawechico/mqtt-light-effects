"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
function waiting(iter, sleep) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var lastItem;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lastItem = iter.next();
                    _a.label = 1;
                case 1:
                    if (!!lastItem.done) return [3 /*break*/, 3];
                    lastItem = iter.next();
                    console.log(lastItem);
                    return [4 /*yield*/, delay(sleep)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.waiting = waiting;
var delay = function (amount) {
    return new Promise(function (resolve) {
        setTimeout(resolve, amount);
    });
};
function loop() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var i;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 50)) return [3 /*break*/, 4];
                    console.log(i);
                    return [4 /*yield*/, delay(100)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.loop = loop;
//# sourceMappingURL=test.js.map