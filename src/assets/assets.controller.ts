import { Controller, Get, Request, Post, Body, Delete, UseGuards } from "@nestjs/common";
import { AssetsService } from './assets.service';
import { AuthGuard } from '@nestjs/passport';
import { AssetDto } from './dto/asset.dto';
class JwtAuthGuard extends AuthGuard('jwt') {}
@Controller('assets')
@UseGuards(JwtAuthGuard)
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get('')
  async get(): Promise<AssetDto[]> {
    return await this.assetsService.getAssets();
  }

  @Post('')
  async create(@Request() req, @Body() body: AssetDto): Promise<any> {
    console.log(req.user);
    // console.log(body);
    // return await this.assetsService.createAsset(body);
  }
  //
  // @Delete('')
  // async delete(
  //
  // )
}
