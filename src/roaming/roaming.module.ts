import { Module } from '@nestjs/common';
import { RoamingService } from './roaming.service';
import { RoamingController } from './roaming.controller';

@Module({
  controllers: [RoamingController],
  providers: [RoamingService],
})
export class RoamingModule {}
