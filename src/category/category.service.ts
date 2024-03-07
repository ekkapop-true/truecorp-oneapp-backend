import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as mddCategory from './data/mddCategory.json';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

export interface ICategoryHeaders {
  brand: string;
  osVersion: string;
}
@Injectable()
export class CategoryService {
  constructor(private readonly httpService: HttpService) {}

  async mddCategory({
    useMock,
    params,
  }: {
    useMock: boolean;
    params: ICategoryHeaders;
  }): Promise<any> {
    const headersRequest = {
      Sessionid: 'session111',
      Sourcesystemid: 'TRUEAPP',
      platform: 'IOS',
      version: '1',
      language: 'EN',
      deviceId: 'D001',
      Authorization: 'test',
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
            headers: headersRequest,
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
