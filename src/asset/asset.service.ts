import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AssetDto } from './dto/asset.dto';

@Injectable()
export class AssetService {
  constructor(private prisma: PrismaService) {}

  async getAssets(userId: string) {
    const res = await this.prisma.asset.findMany({
      where: {
        userId,
      },
    });
    return res;
  }

  async createAsset(userId: string, body: AssetDto) {
    const res = await this.prisma.asset.create({ data: { userId, ...body } });
    return res;
  }

  async deleteAsset(id: string) {
    return await this.prisma.asset.delete({
      where: {
        id,
      },
    });
  }
}
