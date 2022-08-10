import { Module } from '@nestjs/common';
import { DatastoreService } from './datastore.service';

@Module({
  exports: [DatastoreService],
  providers: [DatastoreService],
})
export class DatastoreModule {}
