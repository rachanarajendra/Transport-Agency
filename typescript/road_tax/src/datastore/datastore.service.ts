import { Injectable } from '@nestjs/common';
import { Datastore } from '@google-cloud/datastore';
import constants from 'src/utils/constants';
import { CongestionTax } from 'src/congestion_tax/congestion_tax.interface';

@Injectable()
export class DatastoreService {
  private datastore: Datastore;
  constructor() {
    const options = {
      projectId: constants.datastoreConfig.projectID,
    };
    this.datastore = new Datastore(options);
  }

  /**
   * this method queries and fetch desired data from GCP datastore
   * @param kind string
   * @param filters Record<string, any>
   * @returns Promise<any[]>
   */

  async getCollection(
    kind: string,
    filters: Record<string, any>,
  ): Promise<CongestionTax[]> {
    let query = this.datastore.createQuery(kind);
    for (const filter in filters) {
      query = query.filter(filter, filters[filter]);
    }
    const [taxList] = await this.datastore.runQuery(query);
    return taxList;
  }
}
