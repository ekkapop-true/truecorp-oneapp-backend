import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as mddCategory from './data/mddCategory.json';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

export interface ICategoryParams {
  brand: string;
  osVersion: string;
}

export interface ICategoryHeaders {
  sourcesystemid: string;
  sessionid: string;
  platform: string;
  version: string;
  language: string;
  deviceid: string;
  authorization: string;
}
@Injectable()
export class CategoryService {
  constructor(private readonly httpService: HttpService) {}

  async mddCategory({
    useMock,
    params,
    headersRequestApi,
  }: {
    useMock: boolean;
    params: ICategoryParams;
    headersRequestApi: ICategoryHeaders;
  }): Promise<any> {
    const headersRequestTmp = {
      Sessionid: headersRequestApi.sessionid,
      Sourcesystemid: headersRequestApi.sourcesystemid,
      platform: headersRequestApi.platform,
      version: headersRequestApi.platform,
      language: headersRequestApi.language,
      deviceId: headersRequestApi.deviceid,
      Authorization: headersRequestApi.authorization,
    };

    if (useMock) {
      return mddCategory;
    }

    const { data } = await firstValueFrom(
      this.httpService
        .get(
          'http://trueapp-commonapi-dev.true.th/category/mddCategory/Kyoh6',
          {
            params: params,
            headers: headersRequestTmp,
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
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
