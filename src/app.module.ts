import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PackageService } from './package/package.service';
import { PackageModule } from './package/package.module';
import { CategoryModule } from './category/category.module';
import { RoamingModule } from './roaming/roaming.module';
import { HttpModule } from '@nestjs/axios';
import { PurchaseModule } from './purchase/purchase.module';
import { PurchaseService } from './purchase/purchase.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PackageModule,
    CategoryModule,
    RoamingModule,
    HttpModule,
    PurchaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, PackageService, PurchaseService],
})
export class AppModule {}
