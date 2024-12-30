import { processText } from "../utils/printout-processor";
var textToBufferBase64 = function (text, opts) {
    var buffer = processText(text, opts);
    return buffer.toString('base64');
};
var BasePrinter = /** @class */ (function () {
    function BasePrinter(module) {
        this.module = module;
    }
    BasePrinter.prototype.init = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.module.init(function () { return resolve(); }, function (error) { return reject(error); });
        });
    };
    BasePrinter.prototype.getDeviceList = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.module.getDeviceList(function (printers) { return resolve(printers); }, function (error) { return reject(error); });
        });
    };
    BasePrinter.prototype.closeConn = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.module.closeConn();
            resolve();
        });
    };
    BasePrinter.prototype.print = function (text, opts) {
        this.module.printRawData(textToBufferBase64(text, opts), function (error) {
            return console.warn(error);
        });
    };
    return BasePrinter;
}());
export { BasePrinter };
