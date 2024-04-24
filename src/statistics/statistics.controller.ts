import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Headers,
} from '@nestjs/common';
import { IStatisticsBody, StatisticsService } from './statistics.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('package')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Public()
  @Post('cmpstatistics/api/v1/interest')
  @HttpCode(HttpStatus.OK)
  requestPackList(@Body() body: IStatisticsBody, @Headers() headers) {
    return this.statisticsService.saveStatistics({
      useMock: false,
      body: body,
      headers: headers,
    });
  }
}
