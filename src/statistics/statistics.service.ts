import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

export interface IStatisticsBody {
  registerDTTM: string;
  action: string;
  actionType: string;
  channelID: string;
  bannerID: string;
  brand: string;
  productID: string;
  productType: string;
  custNumb: string;
  telpType: string;
  platform: string;
  device: string;
  osVersion: string;
  sdkVersion: string;
  contentType: string;
  remark: string;
  transactionId: string;
  trackingId: string;
  partnerId: string;
  contents: Content[];
}

export interface Content {
  contentId: string;
  offerCode: string;
  offerTracking: string;
  price: number;
  clickAmt: number;
  successAmt: number;
  responseCode: string;
  responseDesc: string;
  validity: number;
  voiceQuantity: number;
  dataQuantity: number;
  socialBenefit: string;
  entertainBenefit: string;
  gameBenefit: string;
  shoppingBenefit: string;
  cmpTransactionId: string;
  cmpCampaignId: string;
  cmpOfferPoId: string;
}

@Injectable()
export class StatisticsService {
  constructor(private readonly httpService: HttpService) {}

  async saveStatistics({
    useMock,
    body,
    headers,
  }: {
    useMock: boolean;
    body: IStatisticsBody;
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
            'https://trueapp-commonapi-dev.true.th/statistics/statistics/api/v1/statistics',
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
    }
  }
}
