import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Headers,
} from '@nestjs/common';
import { IInterestCmpBody, InterestCmpService } from './interest_cmp.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('package')
export class InterestCmpController {
  constructor(private readonly interestCmpService: InterestCmpService) {}

  @Public()
  @Post('cmpstatistics/api/v1/interest')
  @HttpCode(HttpStatus.OK)
  requestPackList(@Body() body: IInterestCmpBody, @Headers() headers) {
    return this.interestCmpService.requestPackList({
      useMock: false,
      body: body,
      headers: headers,
    });
  }
}
