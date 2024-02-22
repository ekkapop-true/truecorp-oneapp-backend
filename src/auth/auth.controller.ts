import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('requestOTP')
  requestOTP(@Headers('mobileNo') mobileNo) {
    return this.authService.requestOTP(mobileNo);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('verifyOTP')
  verifyOTP(@Headers('mobileNo') mobileNo, @Body() body: Record<string, any>) {
    return this.authService.verifyOTP(mobileNo, body.otp);
  }

  @UseGuards(AuthGuard)
  @Post('checkCrossContract')
  checkCrossContract(@Headers('mobileNo') mobileNo) {
    return this.authService.checkCrossContract(mobileNo);
  }

  @UseGuards(AuthGuard)
  @Post('acceptCrossContract')
  acceptCrossContract(@Headers('mobileNo') mobileNo) {
    return { has_done_contract: true };
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() body: Record<string, any>) {
    return this.authService.signIn(body.username, body.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get('subscriber')
  getSubscriberProfile(@Request() req) {
    return this.authService.getProfile(req.user.sub);
  }
}
