import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

export interface ISubscribePackageRequest {
  acceptWarnFlag?: boolean;
  buyNowJourney?: boolean;
  channelID?: string;
  device?: string;
  osversion?: string;
  packcode?: string;
  packtype: string;
  platform: string;
  price: string;
  resolution: string;
  sdkversion: string;
  teltype: string;
  trackingId: string;
  subrNumb: string;
}
@Injectable()
export class PurchaseService {
  constructor(private readonly httpService: HttpService) {}

  async subscribePackage(body: ISubscribePackageRequest): Promise<any> {
    console.log('body purchse: ', body);

    Object.assign(body, { acceptWarnFlag: false, buyNowJourney: true });
    console.log('after body : ', body);

    const headersRequest = {
      Sessionid: 'O2024022222381701113239',
      Sourcesystemid: 'ESVWEB',
    };
    const { data } = await firstValueFrom(
      this.httpService
        .post(
          'https://ddchpackagetest.test.dtac.co.th/api/upsell/subscriptionv2/additional/EN/66949296202/626171035',
          body,
          { headers: headersRequest },
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error.response.data);
            // return error.response.data;
            throw new HttpException(
              {
                status: {
                  statusType: 'B',
                  errorCode: 'B-UPS-71023',
                  errorMessage: "Subscriber's credit is inadequate",
                  server: 'kalium15.tac.co.th',
                  hostId: '38263b08dc21',
                  transactionId: 'ESVWEB20240223010159319917',
                },
                data: {
                  subrnumb: '66949296202',
                  resultmsg:
                    "Your transaction can't be completed. This number has insufficient balance.",
                  packcode: '21200496',
                  offerFlag: '0',
                  wootricInfo: {
                    dtacId:
                      'c14b848000e906a7579116487851d37713d193604befc5ae0b25cc443fc3652d',
                    journey: 'insufficient',
                  },
                },
              },
              HttpStatus.BAD_REQUEST,
            );
            // throw 'An error happened!';
          }),
        ),
    );

    // console.log('error : ', error);

    return data;
  }
}
