import Client from "../customer/Customer";
import Product from "../product/Product";

const SECONDS_IN_DAY = 86400;

class Rent {
  private _rentId: number;
  private _beginTime: Date;
  private _endTime?: Date;
  private _client: Client;
  private _product: Product;

  constructor(rentId: number, client: Client, product: Product, beginTime: Date = new Date()) {
    this._rentId = rentId;
    this._client = client;
    this._product = product;
    this._beginTime = beginTime;
  }

  // getters
  get rentCost(): number {
    return this._client.applyDiscount(
      this._product.getActualPrice?.() ?? this._product.basePrice
    );
  }

  get rentDays(): number {
    const timeDiffInMs = new Date().valueOf() - this._beginTime.valueOf();
    return timeDiffInMs / SECONDS_IN_DAY;
  }

  get beginTime(): Date {
    return this._beginTime;
  }

  get rentId(): number {
    return this._rentId;
  }

  // setters
  set endTime(time: Date) {
    this._endTime = time;
  }

  // public
  endRent(): void {
    this._endTime = new Date();
  }
}

export default Rent;
