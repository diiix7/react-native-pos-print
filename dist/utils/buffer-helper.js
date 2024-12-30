import { Buffer } from 'buffer';
var BufferHelper = /** @class */ (function () {
    function BufferHelper() {
        this.buffers = [];
        this.size = 0;
    }
    Object.defineProperty(BufferHelper.prototype, "length", {
        get: function () {
            return this.size;
        },
        enumerable: false,
        configurable: true
    });
    BufferHelper.prototype.concat = function (buffer) {
        this.buffers.push(buffer);
        this.size += buffer.length;
        return this;
    };
    ;
    BufferHelper.prototype.empty = function () {
        this.buffers = [];
        this.size = 0;
        return this;
    };
    ;
    BufferHelper.prototype.toBuffer = function () {
        return Buffer.concat(this.buffers, this.size);
    };
    BufferHelper.prototype.toString = function (encoding) {
        return this.toBuffer().toString(encoding);
    };
    return BufferHelper;
}());
export { BufferHelper };
