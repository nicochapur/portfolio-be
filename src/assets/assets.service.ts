import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
// import { AssetDto } from './dto/asset.dto';

@Injectable()
export class AssetsService {
  constructor(private prisma: PrismaService) {}

  async getAssets() {
    const res = await this.prisma.asset.findMany({});
    return res;
  }

  // async createAsset(body: AssetDto) {
  //   const res = await this.prisma.asset.create({ data: body });
  //   return res;
  // }
}
