import { Module } from '@nestjs/common';
import { InterestCmpService } from './interest_cmp.service';
import { InterestCmpController } from './interest_cmp.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [InterestCmpController],
  providers: [InterestCmpService],
  exports: [InterestCmpService],
})
export class InterestCmpModule {}
