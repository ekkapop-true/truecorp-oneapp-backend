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
    // console.log('body: ', body);
    // console.log('!useMock : ', !useMock);
    // console.log('headers : ', headers['content-type']);
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
      // console.log('headers : ', headersRequest);
      const { data } = await firstValueFrom(
        this.httpService
          .post(
            // 'https://ddchpackagetest.test.dtac.co.th/api/upsell/packlistv2/requestPackListV3',
            'http://trueapp-commonapi-dev.true.th/package/commonPackage',
            body,
            { headers: headersRequest },
          )
          .pipe(
            catchError((error: AxiosError) => {
              console.log(error);
              throw new HttpException(
                error.response.data,
                // {
                //   status: {
                //     statusType: 'B',
                //     errorCode: 'B-UPS-71023',
                //     errorMessage: "Subscriber's credit is inadequate",
                //     server: 'kalium15.tac.co.th',
                //     hostId: '38263b08dc21',
                //     transactionId: 'ESVWEB20240223010159319917',
                //   },
                //   data: {
                //     subrnumb: '66949296202',
                //     resultmsg:
                //       "Your transaction can't be completed. This number has insufficient balance.",
                //     packcode: '21200496',
                //     offerFlag: '0',
                //     wootricInfo: {
                //       dtacId:
                //         'c14b848000e906a7579116487851d37713d193604befc5ae0b25cc443fc3652d',
                //       journey: 'insufficient',
                //     },
                //   },
                // },
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
