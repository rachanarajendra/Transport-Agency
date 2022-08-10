import { DatastoreService } from 'src/datastore/datastore.service';
import { CalculateCongestionTaxResponseDTO, GetCongestionTaxDTO } from './dto/congestion_tax.dto';
export declare class CongestionTaxService {
    private readonly datastoreService;
    constructor(datastoreService: DatastoreService);
    calculateTax(payload: GetCongestionTaxDTO): Promise<CalculateCongestionTaxResponseDTO>;
    private getTax;
    private isTollFreeVehicle;
    private getTollFee;
    private isTollFreeDate;
}
