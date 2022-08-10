export class GetCongestionTaxDTO {
  cityCode: string;
  dates: string[];
  year: number;
  vehicleType?: string;
}

export class CalculateCongestionTaxResponseDTO {
  cityCode: string;
  year: number;
  totalTax: string;
  vehicleType: string;
}
