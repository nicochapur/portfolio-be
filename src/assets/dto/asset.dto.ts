
export class AssetDto {
  symbol: string;

  amount: number;

  price: number;

  type: string;

  constructor(data: AssetDto) {
    this.symbol = data.symbol;
    this.amount = data.amount;
    this.price = data.price;
    this.type = data.type;
  }
}
