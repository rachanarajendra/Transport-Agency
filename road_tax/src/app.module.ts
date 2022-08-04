import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CongestionTaxModule } from './congestion_tax/congestion_tax.module';
import { DatastoreService } from './datastore/datastore.service';
import { DatastoreModule } from './datastore/datastore.module';

@Module({
  imports: [CongestionTaxModule, DatastoreModule],
  controllers: [AppController],
  providers: [AppService, DatastoreService],
})
export class AppModule {}
