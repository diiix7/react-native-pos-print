import { BasePrinter } from './base-printer';
import { IUSBPrinterIdentity } from '../models/usb-printer-identity';
export declare class USBPrinterWrapper extends BasePrinter<IUSBPrinterIdentity> {
    constructor();
    connectPrinter: (vendorId: string, productId: string) => Promise<IUSBPrinterIdentity>;
}
