import { Module } from '@nestjs/common';
import { RoamingService } from './roaming.service';
import { RoamingController } from './roaming.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [RoamingController],
  providers: [RoamingService],
  exports: [RoamingService],
})
export class RoamingModule {}
