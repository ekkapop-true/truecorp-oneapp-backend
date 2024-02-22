import { Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';

@Module({
  providers: [PackageService],
  exports: [PackageService],
  controllers: [PackageController],
})
export class PackageModule {}
