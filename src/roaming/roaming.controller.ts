import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { RoamingService } from './roaming.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('roaming')
export class RoamingController {
  constructor(private readonly roamingService: RoamingService) {}

  @Public()
  @Get('listCountryPackageIR')
  @HttpCode(HttpStatus.OK)
  listCountryPackageIR() {
    return this.roamingService.listCountryPackageIR();
  }
}
