"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CongestionTaxModule = void 0;
const common_1 = require("@nestjs/common");
const datastore_module_1 = require("../datastore/datastore.module");
const congestion_tax_controller_1 = require("./congestion_tax.controller");
const congestion_tax_service_1 = require("./congestion_tax.service");
let CongestionTaxModule = class CongestionTaxModule {
};
CongestionTaxModule = __decorate([
    (0, common_1.Module)({
        imports: [datastore_module_1.DatastoreModule],
        controllers: [congestion_tax_controller_1.CongestionTaxController],
        providers: [congestion_tax_service_1.CongestionTaxService],
    })
], CongestionTaxModule);
exports.CongestionTaxModule = CongestionTaxModule;
//# sourceMappingURL=congestion_tax.module.js.map