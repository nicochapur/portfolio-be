import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../prisma.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [
    // JwtStrategy,
    AuthController,
    AuthService,
    AuthRepository,
    PrismaService,
  ],
  exports: [AuthController, AuthService, PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
