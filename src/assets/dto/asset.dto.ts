import { IsNotEmpty } from 'class-validator';

export class AssetDto {
  @IsNotEmpty()
  symbol: string;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  type: string;

  constructor(data: AssetDto) {
    this.symbol = data.symbol;
    this.amount = data.amount;
    this.price = data.price;
    this.type = data.type;
  }
}
