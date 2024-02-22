import { Injectable } from '@nestjs/common';

import * as packlistDtac from './data/requestPackListDtac.json';
import * as packlistGuestMode from './data/requestPackListGuestMode.json';
import * as packlistTrue from './data/requestPacklistTrue.json';
import { HttpService } from '@nestjs/axios';

export interface IRequestPackListBody {
  subrNumb?: string;
  lang?: string;
  channel: string;
  trackingId: string;
  bannerType: string;
  mappingId: string;
  dtacId: string;
  dtacFrom: string;
  brand: Brand;
}

enum Brand {
  True = 'true',
  Dtac = 'dtac',
}

@Injectable()
export class PackageService {
  constructor(private readonly httpService: HttpService) {}

  async requestPackList({
    useMock,
    body,
  }: {
    useMock: boolean;
    body: IRequestPackListBody;
  }): Promise<any> {
    console.log('body: ', body);
    if (useMock) {
      const headersRequest = {
        Sessionid: 'O2024022222381701113239',
        Sourcesystemid: 'ESVWEB',
      };
      const { data } = await this.httpService.axiosRef.post(
        'https://ddchpackagetest.test.dtac.co.th/api/upsell/packlistv2/requestPackListV3',
        body,
        { headers: headersRequest },
      );
      return data;
    } else {
      return body.subrNumb && body.brand == Brand.Dtac
        ? packlistDtac
        : body.subrNumb && body.brand == Brand.True
          ? packlistTrue
          : packlistGuestMode;
    }
  }
  // async requestPackList(body: IRequestPackListBody): Promise<any> {
  //   return body.subrNumb ? packlist : packlistGuestMode;
  // }
}
