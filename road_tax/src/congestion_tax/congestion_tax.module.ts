import { Module } from '@nestjs/common';
import { DatastoreModule } from 'src/datastore/datastore.module';
import { CongestionTaxController } from './congestion_tax.controller';
import { CongestionTaxService } from './congestion_tax.service';

@Module({
  imports: [DatastoreModule],
  controllers: [CongestionTaxController],
  providers: [CongestionTaxService],
})
export class CongestionTaxModule {}
