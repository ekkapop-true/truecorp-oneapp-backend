import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
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
  //?lang=en&countryCode=JPN&subrType=
  @Public()
  @Get('listPackageByCountry?')
  @HttpCode(HttpStatus.OK)
  listPackageByCountry(
    @Query('lang') lang: string,
    @Query('countryCode') countryCode: string,
    @Query('subrType') subrType: string,
  ) {
    return this.roamingService.listPackageByCountry(
      lang,
      countryCode,
      subrType,
    );
  }

  @Public()
  @Get('getDataRoamingRates?')
  @HttpCode(HttpStatus.OK)
  getDataRoamingRates(
    @Query('lang') lang: string,
    @Query('countryCode') countryCode: string,
  ) {
    return this.roamingService.getDataRoamingRates(lang, countryCode);
  }

  @Public()
  @Get('getTimeZone?')
  @HttpCode(HttpStatus.OK)
  getTimeZone(
    @Query('lang') lang: string,
    @Query('countryCode') countryCode: string,
  ) {
    return this.roamingService.getTimeZone(lang, countryCode);
  }
}
