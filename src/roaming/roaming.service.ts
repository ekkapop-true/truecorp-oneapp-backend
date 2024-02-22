import { Injectable } from '@nestjs/common';

import * as listCountry from './data/listCountry.json';

@Injectable()
export class RoamingService {
  async listCountryPackageIR(): Promise<any> {
    return listCountry;
  }
}
