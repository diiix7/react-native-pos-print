import { INetPrinterIdentity } from '../models/net-printer-identity';
import { BasePrinter } from './base-printer';
export declare const RNNetPrinter: any;
export declare class NetPrinterWrapper extends BasePrinter<INetPrinterIdentity> {
    constructor();
    connectPrinter: (host: string, port: number) => Promise<INetPrinterIdentity>;
}
