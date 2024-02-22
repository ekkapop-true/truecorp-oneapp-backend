import { Injectable } from '@nestjs/common';

import * as packlist from './data/requestPackList.json';
import * as packlistGuestMode from './data/requestPackListGuestMode.json';

export interface IRequestPackListBody {
  subrNumb?: string;
  lang?: string;
  channel: string;
  trackingId: string;
  bannerType: string;
  mappingId: string;
  dtacId: string;
  dtacFrom: string;
}

@Injectable()
export class PackageService {
  async requestPackList(body: IRequestPackListBody): Promise<any> {
    return body.subrNumb ? packlist : packlistGuestMode;
  }
}
