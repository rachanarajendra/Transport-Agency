import { Test, TestingModule } from '@nestjs/testing';
import { DatastoreModule } from 'src/datastore/datastore.module';
import { CongestionTaxController } from './congestion_tax.controller';
import { CongestionTaxService } from './congestion_tax.service';

describe('CongestionTaxController', () => {
  let controller: CongestionTaxController;
  let congestionTaxService: CongestionTaxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatastoreModule],
      controllers: [CongestionTaxController],
      providers: [CongestionTaxService],
    }).compile();

    controller = module.get<CongestionTaxController>(CongestionTaxController);
    congestionTaxService =
      module.get<CongestionTaxService>(CongestionTaxService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should calculate tax', async () => {
    const payload = {
      dates: [
        '2013-01-14 21:00:00',
        '2013-01-15 21:00:00',
        '2013-02-07 06:23:27',
        '2013-02-07 15:27:00',
        '2013-02-08 06:27:00',
        '2013-02-08 06:20:27',
        '2013-02-08 14:35:00',
      ],
      cityCode: 'got',
      year: 2013,
    };
    const result = {
      cityCode: 'got',
      year: 2013,
      totalTax: '21 SEK',
      vehicleType: 'Car',
    };
    jest.spyOn(congestionTaxService, 'calculateTax').mockResolvedValue(result);

    expect(
      await controller.calculateCongestionTaxForVehicle(
        {
          vehicleType: 'Car',
        },
        payload,
      ),
    ).toBe(result);
  });
});
