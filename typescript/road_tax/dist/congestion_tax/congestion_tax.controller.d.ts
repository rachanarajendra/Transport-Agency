import { CongestionTaxService } from './congestion_tax.service';
import { CalculateCongestionTaxResponseDTO, GetCongestionTaxDTO } from './dto/congestion_tax.dto';
export declare class CongestionTaxController {
    private readonly congestionTaxService;
    constructor(congestionTaxService: CongestionTaxService);
    calculateCongestionTaxForVehicle(params: any, calculateTaxPayload: GetCongestionTaxDTO): Promise<CalculateCongestionTaxResponseDTO>;
}
