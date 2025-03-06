import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { AssetController } from './asset/asset.controller';
import { AssetService } from './asset/asset.service';
import { AuthRepository } from './auth/auth.repository';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [AppController, UsersController, AssetController],
  providers: [
    AppService,
    UsersService,
    PrismaService,
    AssetService,
    AuthRepository,
  ],
})
export class AppModule {}
