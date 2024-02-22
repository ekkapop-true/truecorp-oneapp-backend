import { Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [PackageService],
  exports: [PackageService],
  controllers: [PackageController],
})
export class PackageModule {}
