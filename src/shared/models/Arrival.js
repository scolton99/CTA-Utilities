"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Arrival = /** @class */ (function () {
    function Arrival() {
        var _this = this;
        this.countdown = function () { return (Math.round((_this.arrival_ts.getTime() - _this.prediction_ts.getTime()) / (1000 * 60))); };
    }
    return Arrival;
}());
exports.default = Arrival;
//# sourceMappingURL=Arrival.js.map