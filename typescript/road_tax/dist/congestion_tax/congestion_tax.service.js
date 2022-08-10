"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CongestionTaxService = void 0;
const common_1 = require("@nestjs/common");
const datastore_service_1 = require("../datastore/datastore.service");
const constants_1 = require("../utils/constants");
const congestion_tax_enums_1 = require("./enum/congestion_tax.enums");
let CongestionTaxService = class CongestionTaxService {
    constructor(datastoreService) {
        this.datastoreService = datastoreService;
    }
    async calculateTax(payload) {
        const response = {
            cityCode: payload.cityCode,
            year: payload.year,
            totalTax: '0 SEK',
            vehicleType: payload.vehicleType,
        };
        if (!this.isTollFreeVehicle(payload.vehicleType)) {
            const tax = await this.getTax(payload.cityCode, payload.dates, payload.year);
            response.totalTax = tax + ' SEK';
        }
        return response;
    }
    async getTax(cityCode, dates, year) {
        let intervalStart;
        const taxList = await this.datastoreService.getCollection(constants_1.default.datastoreConfig.congestionTaxKind, {
            city_code: cityCode,
            year,
        });
        let totalFee = 0;
        let dayTollFee = 0;
        for (let i = 0; i < dates.length; i++) {
            const date = new Date(dates[i]);
            const tollFee = await this.getTollFee(date, taxList);
            if (i == 0) {
                if (tollFee > 0)
                    dayTollFee = tollFee;
                intervalStart = date;
            }
            const diffInMillies = date.getTime() - intervalStart.getTime();
            const minutes = diffInMillies / 1000 / 60;
            if (minutes <= 60) {
                if (tollFee >= dayTollFee)
                    dayTollFee = tollFee;
                totalFee += dayTollFee;
            }
            else {
                totalFee += tollFee;
            }
            if (totalFee > 60)
                totalFee = 60;
        }
        return totalFee;
    }
    isTollFreeVehicle(vehicleType) {
        if (vehicleType == null)
            return false;
        return vehicleType in congestion_tax_enums_1.TollFreeVehicles ? true : false;
    }
    async getTollFee(date, taxList) {
        if (this.isTollFreeDate(date))
            return 0;
        const hour = date.getHours();
        const minute = date.getMinutes();
        let tax = 0;
        taxList.forEach((slot) => {
            if (hour == slot.start_hour &&
                minute >= slot.start_min &&
                minute <= slot.end_min)
                tax = slot.amount;
        });
        return tax;
    }
    isTollFreeDate(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDay() + 1;
        const dayOfMonth = date.getDate();
        if (day == 6 || day == 0)
            return true;
        if (constants_1.default.holidaysOfYear.hasOwnProperty(year)) {
            if (constants_1.default.holidaysOfYear[year].hasOwnProperty(month) &&
                (constants_1.default.holidaysOfYear[year][month] == 'all' ||
                    constants_1.default.holidaysOfYear[year][month].indexOf(dayOfMonth))) {
                return true;
            }
        }
        return false;
    }
};
CongestionTaxService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [datastore_service_1.DatastoreService])
], CongestionTaxService);
exports.CongestionTaxService = CongestionTaxService;
//# sourceMappingURL=congestion_tax.service.js.map