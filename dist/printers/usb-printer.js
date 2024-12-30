var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { NativeModules } from 'react-native';
import { BasePrinter } from './base-printer';
var RNUSBPrinter = NativeModules.RNUSBPrinter;
var USBPrinterWrapper = /** @class */ (function (_super) {
    __extends(USBPrinterWrapper, _super);
    function USBPrinterWrapper() {
        var _this = _super.call(this, RNUSBPrinter) || this;
        _this.connectPrinter = function (vendorId, productId) {
            return new Promise(function (resolve, reject) {
                return _this.module.connectPrinter(vendorId, productId, function (printer) { return resolve(printer); }, function (error) { return reject(error); });
            });
        };
        return _this;
    }
    return USBPrinterWrapper;
}(BasePrinter));
export { USBPrinterWrapper };
