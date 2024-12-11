import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from '../users/dto/UserDto';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: UserDto) {
    return await this.prisma.user.create({
      data,
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async updatePassword(userId: string, password: string) {
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password,
      },
    });
  }
}
