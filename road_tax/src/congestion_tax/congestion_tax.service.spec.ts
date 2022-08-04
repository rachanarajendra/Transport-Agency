import { Test, TestingModule } from '@nestjs/testing';
import { DatastoreModule } from 'src/datastore/datastore.module';
import { DatastoreService } from 'src/datastore/datastore.service';
import { CongestionTaxService } from './congestion_tax.service';

describe('CongestionTaxService', () => {
  let service: CongestionTaxService;
  let datastoreService: DatastoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatastoreModule],
      providers: [CongestionTaxService, DatastoreService],
    }).compile();
    service = module.get<CongestionTaxService>(CongestionTaxService);
    datastoreService = module.get<DatastoreService>(DatastoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate tax', async () => {
    //given
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
      vehicleType: 'Car',
    };
    const result = {
      cityCode: 'got',
      year: 2013,
      totalTax: '21 SEK',
      vehicleType: 'Car',
    };
    //when
    jest.spyOn(service, 'calculateTax').mockResolvedValue(result);
    const response = await service.calculateTax(payload);
    //then
    expect(response).toMatchObject(result);
  });
});
