import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginRequestDto } from './dto/login.dto';
import { JwtDto } from './dto/jwt.dto';
import { UserDto } from '../users/dto/UserDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private readonly jwtService: JwtService,

    private readonly authRepository: AuthRepository,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  private async comparePassword(
    password: string,
    hash: string | null,
  ): Promise<boolean> {
    if (!hash) return false;
    return await bcrypt.compare(password, hash);
  }

  private async getJWT(authId): Promise<string> {
    return this.jwtService.signAsync(
      { sub: authId },
      { secret: this.configService.get<string>('JWT_SECRET') },
    );
  }
  async login(loginDTO: LoginRequestDto): Promise<JwtDto> {
    loginDTO.email = loginDTO.email.toLowerCase();
    const auth = await this.authRepository.findByEmail(loginDTO.email);
    if (!auth) {
      throw new HttpException('Email already exists', HttpStatus.NOT_FOUND);
    }
    const isCorrectPassword = await this.comparePassword(
      loginDTO.password,
      auth.password,
    );
    if (!isCorrectPassword) {
      throw new HttpException('Incorrect credentials', HttpStatus.NOT_FOUND);
    }
    const jwt = await this.getJWT(auth.id);
    return new JwtDto(jwt);
  }

  async register(registerDTO: UserDto): Promise<JwtDto> {
    registerDTO.email = registerDTO.email.toLowerCase();
    const auth = await this.authRepository.findByEmail(registerDTO.email);
    if (auth) {
      throw new HttpException('The email already exists', HttpStatus.CONFLICT);
    } else {
      const hashedPassword = await this.hashPassword(registerDTO.password);
      const authCreated = await this.authRepository.create({
        ...registerDTO,
        password: hashedPassword,
      });
      const jwt = await this.getJWT(authCreated.id);
      return new JwtDto(jwt);
    }
  }

  async updatePassword(data: UserDto) {
    const user = await this.authRepository.findByEmail(data.email);
    if (!user) {
      new HttpException('User doesnt exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await this.hashPassword(data.password);

    await this.authRepository.updatePassword(user.id, hashedPassword);
  }
}
