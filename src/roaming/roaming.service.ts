import * as listCountry from './data/listCountry.json';
import * as timeZone from './data/timeZone.json';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class RoamingService {
  constructor(private readonly httpService: HttpService) {}

  async listCountryPackageIR(): Promise<any> {
    return listCountry;
  }

  async listPackageByCountry(
    lang: string,
    countryCode: string,
    subrType: string,
  ): Promise<any> {
    console.log('query lang: ', lang);
    console.log('query countryCode: ', countryCode);
    console.log('query subrType: ', subrType);

    const headersRequest = {
      sessionId: 'O2024022815071124459629',
      sourceSystemId: 'ESVWEB',
      stamp:
        '227f160662036f5b92bcd75372d4d4db96a38dd3b2b9badc79cba9b8ee693f68f6cd81972d108343a8ddb5a5827992c199bdcb4e3b8e4aab835a4fdcfbb007adce91be89eff78eb4c0d91da6ea1f875b4ca3320a639281d7a087d4cdfbf11bf2',
      // stamp:
      //   '204b1eb4c330b569fd5b675d1b3d7da60a521de0ad0cf8447ec2ffbe2ecd7d5251b5e72e58fd65f4fe81b8706e3c0a4199bdcb4e3b8e4aab835a4fdcfbb007ad1c3e100cd86a12127b1e1f0b7bdee960210cee4ee728bd83d1bf70ceb7c2d5f0',
    };
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          'https://ddchpackagetest.test.dtac.co.th/api/mobpackage/ListPackageByCountry?lang=' +
            lang +
            '&countryCode=' +
            countryCode +
            '&subrType=' +
            subrType,
          { headers: headersRequest },
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error.response, HttpStatus.BAD_REQUEST);
            // throw 'An error happened!';
          }),
        ),
    );

    console.log('data : ', data);

    return data;
  }

  async getDataRoamingRates(lang: string, countryCode: string): Promise<any> {
    console.log('query lang: ', lang);
    console.log('query countryCode: ', countryCode);

    const headersRequest = {
      Sessionid: 'O2024022222381701113239',
      Sourcesystemid: 'ESVWEB',
      stamp:
        '204b1eb4c330b569fd5b675d1b3d7da60a521de0ad0cf8447ec2ffbe2ecd7d5251b5e72e58fd65f4fe81b8706e3c0a4199bdcb4e3b8e4aab835a4fdcfbb007ad1c3e100cd86a12127b1e1f0b7bdee960210cee4ee728bd83d1bf70ceb7c2d5f0',
    };
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          'https://ddchpackagetest.test.dtac.co.th/api/mobpackage/GetDataRoamingRates?lang=' +
            lang +
            '&countryCode=' +
            countryCode,
          { headers: headersRequest },
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error.response, HttpStatus.BAD_REQUEST);
            // throw 'An error happened!';
          }),
        ),
    );

    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getTimeZone(lang: string, countryCode: string): Promise<any> {
    return timeZone;
  }

  async getIddRates(lang: string, countryCode: string): Promise<any> {
    const headersRequest = {
      Sessionid: 'O2024030113531747741692',
      Sourcesystemid: 'ESVWEB',
      stamp:
        '4842a267e9f9427899a277943744ac1a0a521de0ad0cf8447ec2ffbe2ecd7d5251b5e72e58fd65f4fe81b8706e3c0a4199bdcb4e3b8e4aab835a4fdcfbb007ad0854a8979faafa02082c3200b25dbf946a724694387d9bf0f20b4c9ed6cfba89',
    };
    const path =
      'https://ddchpackagetest.test.dtac.co.th/api/mobpackage/GetDataIDDRates?chnlId=MOB&sessionId=1234&lang=' +
      lang +
      '&countryCode=' +
      countryCode;
    console.log('link' + path);
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          'https://ddchpackagetest.test.dtac.co.th/api/mobpackage/GetDataIDDRates?chnlId=MOB&sessionId=1234&lang=' +
            lang +
            '&countryCode=' +
            countryCode,
          { headers: headersRequest },
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error.response, HttpStatus.BAD_REQUEST);
            // throw 'An error happened!';
          }),
        ),
    );

    return data;
  }
}
