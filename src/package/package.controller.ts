import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { IRequestPackListBody, PackageService } from './package.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('package')
export class PackageController {
  constructor(private packageService: PackageService) {}

  @Public()
  @Post('requestPackList')
  @HttpCode(HttpStatus.OK)
  requestPackList(@Body() body: IRequestPackListBody, @Headers() headers) {
    return this.packageService.requestPackList({
      useMock: false,
      body: body,
      headers: headers,
    });
  }
}
