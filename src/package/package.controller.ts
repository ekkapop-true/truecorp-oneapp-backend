import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { IRequestPackListBody, PackageService } from './package.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('package')
export class PackageController {
  constructor(private packageService: PackageService) {}

  @Public()
  @Post('requestPackList')
  @HttpCode(HttpStatus.OK)
  requestPackList(@Body() body: IRequestPackListBody) {
    return this.packageService.requestPackList({ useMock: true, body: body });
  }
}
