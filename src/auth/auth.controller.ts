import { Body, Controller, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtDto } from './dto/jwt.dto';
import { UserDto } from '../users/dto/UserDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: UserDto): Promise<JwtDto> {
    return this.authService.login(body);
  }

  @Post('register')
  async register(@Body() body: UserDto): Promise<JwtDto> {
    return this.authService.register(body);
  }

  @Put('change-password')
  async updatePassword(@Body() body: UserDto): Promise<void> {
    return this.authService.updatePassword(body);
  }
}
