import { IBLEPrinterIdentity } from '../models/ble-printer-identity';
import { BasePrinter } from './base-printer';
export declare class BLEPrinterWrapper extends BasePrinter<IBLEPrinterIdentity> {
    constructor();
    connectPrinter: (innerMacAddress: string) => Promise<IBLEPrinterIdentity>;
}
