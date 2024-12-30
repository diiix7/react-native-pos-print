import { IPrintOptions } from "../models/print-options";
export declare class BasePrinter<T> {
    protected module: any;
    constructor(module: any);
    init(): Promise<void>;
    getDeviceList(): Promise<T[]>;
    closeConn(): Promise<void>;
    print(text: string, opts?: IPrintOptions): void;
}
