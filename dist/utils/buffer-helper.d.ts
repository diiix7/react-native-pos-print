/// <reference types="node" />
/// <reference types="node" />
export declare class BufferHelper {
    buffers: Buffer[];
    size: number;
    constructor();
    get length(): number;
    concat(buffer: Buffer): BufferHelper;
    empty(): BufferHelper;
    toBuffer(): Buffer;
    toString(encoding: BufferEncoding): string;
}
