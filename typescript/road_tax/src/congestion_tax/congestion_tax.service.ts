import { Injectable } from '@nestjs/common';
import { DatastoreService } from 'src/datastore/datastore.service';
import constants from 'src/utils/constants';
import { CongestionTax } from './congestion_tax.interface';
import {
  CalculateCongestionTaxResponseDTO,
  GetCongestionTaxDTO,
} from './dto/congestion_tax.dto';
import { TollFreeVehicles } from './enum/congestion_tax.enums';

@Injectable()
export class CongestionTaxService {
  constructor(private readonly datastoreService: DatastoreService) {}

  async calculateTax(
    payload: GetCongestionTaxDTO,
  ): Promise<CalculateCongestionTaxResponseDTO> {
    const response: CalculateCongestionTaxResponseDTO = {
      cityCode: payload.cityCode,
      year: payload.year,
      totalTax: '0 SEK',
      vehicleType: payload.vehicleType,
    };

    if (!this.isTollFreeVehicle(payload.vehicleType)) {
      const tax: number = await this.getTax(
        payload.cityCode,
        payload.dates,
        payload.year,
      );
      response.totalTax = tax + ' SEK';
    }

    return response;
  }

  private async getTax(
    cityCode: string,
    dates: string[],
    year: number,
  ): Promise<number> {
    let intervalStart: Date;
    const taxList = await this.datastoreService.getCollection(
      constants.datastoreConfig.congestionTaxKind,
      {
        city_code: cityCode,
        year,
      },
    );
    let totalFee = 0;
    let dayTollFee = 0;

    for (let i = 0; i < dates.length; i++) {
      const date: Date = new Date(dates[i]);
      const tollFee: number = await this.getTollFee(date, taxList);
      if (i == 0) {
        if (tollFee > 0) dayTollFee = tollFee; // first time toll fee for a day
        intervalStart = date;
      }

      const diffInMillies = date.getTime() - intervalStart.getTime();
      const minutes = diffInMillies / 1000 / 60;
      if (minutes <= 60) {
        if (tollFee >= dayTollFee) dayTollFee = tollFee; // max toll fee per day
        totalFee += dayTollFee;
      } else {
        totalFee += tollFee;
      }
      if (totalFee > 60) totalFee = 60;
    }
    return totalFee;
  }

  private isTollFreeVehicle(vehicleType: string): boolean {
    if (vehicleType == null) return false;
    return vehicleType in TollFreeVehicles ? true : false;
  }

  private async getTollFee(
    date: Date,
    taxList: CongestionTax[],
  ): Promise<number> {
    if (this.isTollFreeDate(date)) return 0;

    const hour: number = date.getHours();
    const minute: number = date.getMinutes();

    let tax = 0;
    taxList.forEach((slot) => {
      if (
        hour == slot.start_hour &&
        minute >= slot.start_min &&
        minute <= slot.end_min
      )
        tax = slot.amount;
    });
    return tax;
  }

  private isTollFreeDate(date: Date): boolean {
    const year: number = date.getFullYear();
    const month: number = date.getMonth() + 1;
    const day: number = date.getDay() + 1;
    const dayOfMonth: number = date.getDate();

    if (day == 6 || day == 0) return true; //saturday && sunday

    if (constants.holidaysOfYear.hasOwnProperty(year)) {
      if (
        constants.holidaysOfYear[year].hasOwnProperty(month) &&
        (constants.holidaysOfYear[year][month] == 'all' ||
          constants.holidaysOfYear[year][month].indexOf(dayOfMonth))
      ) {
        return true;
      }
    }
    return false;
  }
}
