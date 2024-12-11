import {
  Controller,
  Get,
  Request,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetDto } from './dto/asset.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('assets')
@UseGuards(JwtAuthGuard)
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get('')
  async get(@Request() req): Promise<AssetDto[]> {
    return await this.assetsService.getAssets(req.user.id);
  }

  @Post('')
  async create(@Request() req, @Body() body: AssetDto): Promise<any> {
    return await this.assetsService.createAsset(req.user.id, body);
  }
}
