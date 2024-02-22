import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

const OTP: string = '123456';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.userId, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async requestOTP(mobileNo: string): Promise<{ ref: string }> {
    const user = await this.usersService.findByMobileNo(mobileNo);

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      ref: 'O1cCL',
    };
  }

  async verifyOTP(
    mobileNo: string,
    otp: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByMobileNo(mobileNo);

    if (!user || otp != OTP) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.userId, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async checkCrossContract(
    mobileNo: string,
  ): Promise<{ has_done_contract: boolean }> {
    const user = await this.usersService.findByMobileNo(mobileNo);

    if (!user) {
      throw new UnauthorizedException();
    }

    return { has_done_contract: user.consent_status };
  }

  async getProfile(id: number): Promise<{}> {
    const user = await this.usersService.findById(id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      status: {
        statusType: 'S',
        errorCode: 'S-UPS-00000',
        errorMessage: 'Successfully processed',
        server: 'kalium15.tac.co.th',
        hostId: '8ff5fc669fad',
        transactionId: 'ESVWEB20231906151234109104',
      },
      data: user,
    };
  }
}
