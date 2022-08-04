import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { CongestionTaxService } from './congestion_tax.service';
import {
  CalculateCongestionTaxResponseDTO,
  GetCongestionTaxDTO,
} from './dto/congestion_tax.dto';

@Controller('congestiontax')
export class CongestionTaxController {
  constructor(private readonly congestionTaxService: CongestionTaxService) {}

  @Post('/:vehicleType/calculate_tax')
  @HttpCode(200)
  async calculateCongestionTaxForVehicle(
    @Param() params,
    @Body() calculateTaxPayload: GetCongestionTaxDTO,
  ): Promise<CalculateCongestionTaxResponseDTO> {
    calculateTaxPayload.vehicleType = params.vehicleType;
    return this.congestionTaxService.calculateTax(calculateTaxPayload);
  }
}
