import { CongestionTax } from 'src/congestion_tax/congestion_tax.interface';
export declare class DatastoreService {
    private datastore;
    constructor();
    getCollection(kind: string, filters: Record<string, any>): Promise<CongestionTax[]>;
}
