import {
  Controller,
  Get,
  Request,
  Post,
  Body,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetDto } from './dto/asset.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('asset')
@UseGuards(JwtAuthGuard)
export class AssetController {
  constructor(private readonly assetsService: AssetService) {}

  @Get('')
  async get(@Request() req): Promise<AssetDto[]> {
    return await this.assetsService.getAssets(req.user.id);
  }

  @Post('')
  async create(@Request() req, @Body() body: AssetDto): Promise<any> {
    return await this.assetsService.createAsset(req.user.id, body);
  }

  @Delete('/:assetId')
  async delete(
    @Request() req,
    @Param('assetId') assetId: string,
  ): Promise<any> {
    return await this.assetsService.deleteAsset(assetId);
  }
}
