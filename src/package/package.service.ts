import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as packlistDtac from './data/requestPackListDtac.json';
import * as packlistGuestMode from './data/requestPackListGuestMode.json';
import * as packlistTrue from './data/requestPacklistTrue.json';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

export interface IRequestPackListBody {
  subrNumb?: string;
  lang?: string;
  channel: string;
  trackingId: string;
  bannerType: string;
  mappingId: string;
  dtacId?: string;
  dtacFrom?: string;
  brand?: Brand;
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
    headers,
  }: {
    useMock: boolean;
    body: IRequestPackListBody;
    headers: any;
  }): Promise<any> {
    if (!useMock) {
      const headersRequest = {
        sourceSystemId: headers.sourcesystemid,
        sessionId: headers.sessionid,
        platform: headers.platform,
        version: headers.version,
        language: headers.language,
        deviceId: headers.deviceid,
        'Content-Type': headers['content-type'],
        Authorization: headers.authorization,
      };

      const { data } = await firstValueFrom(
        this.httpService
          .post(
            // 'https://ddchpackagetest.test.dtac.co.th/api/upsell/packlistv2/requestPackListV3',
            'http://trueapp-commonapi-dev.true.th/package/package/api/v1/commonPackage',
            body,
            { headers: headersRequest },
          )
          .pipe(
            catchError((error: AxiosError) => {
              console.log(error);
              throw new HttpException(
                error.response.data,

                HttpStatus.BAD_REQUEST,
              );
            }),
          ),
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
