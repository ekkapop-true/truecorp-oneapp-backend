import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as mddCategory from './data/mddCategory.json';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

export interface ICategoryParams {
  brand: string;
  osVersion: string;
  mappingId: string;
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
      sessionId: headersRequestApi.sessionid,
      sourceSystemId: headersRequestApi.sourcesystemid,
      platform: headersRequestApi.platform,
      version: headersRequestApi.platform,
      language: headersRequestApi.language,
      deviceId: headersRequestApi.deviceid,
      Authorization: headersRequestApi.authorization,
      'Content-Type': 'application/json',
    };
    if (useMock) {
      return mddCategory;
    }
    //category/mddCategory/Kyoh6?brand=dtac&mappingId=Kyoh6&osVersion=NewApp
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          'http://trueapp-commonapi-dev.true.th/category/category/api/v1/mddCategory/' +
            params.mappingId,
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
