import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ISubscribePackageRequest, PurchaseService } from './purchase.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Public()
  @Post('package')
  @HttpCode(HttpStatus.OK)
  subscribePackage(@Body() body: ISubscribePackageRequest) {
    return this.purchaseService.subscribePackage(body);
  }
}
