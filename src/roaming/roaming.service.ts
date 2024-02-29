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
      Sessionid: 'O2024022222381701113239',
      Sourcesystemid: 'ESVWEB',
      stamp:
        '204b1eb4c330b569fd5b675d1b3d7da60a521de0ad0cf8447ec2ffbe2ecd7d5251b5e72e58fd65f4fe81b8706e3c0a4199bdcb4e3b8e4aab835a4fdcfbb007ad1c3e100cd86a12127b1e1f0b7bdee960210cee4ee728bd83d1bf70ceb7c2d5f0',
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
}
