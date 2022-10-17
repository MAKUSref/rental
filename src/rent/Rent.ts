import Client from "../client/Client";
import Product from "../product/Product";

const SECONDS_IN_DAY = 86400;

class Rent {
  private _id: number;
  private _beginTime: number = Date.now();
  private _endTime?: number;
  private _client: Client;
  private _product: Product;

  constructor(id: number, client: Client, product: Product) {
    this._id = id;
    this._client = client;
    this._product = product;
  }

  // getters
  get rentCost(): number {
    return this._client.applyDiscount(
      this._product.getActualPrice?.() ?? this._product.basePrice
    );
  }

  get rentDays(): number {
    const timeDiffInMs = Date.now() - this._beginTime;
    return timeDiffInMs / SECONDS_IN_DAY;
  }

  get beginTime(): Date {
    return new Date(this._beginTime * 1000);
  }

  // get endTime(): number | void {
  //   if (this._endTime) {
  //     return Date.now();
  //   }
  // }

  // setters
  set endTime(time: number) {
    this._endTime = time;
  }

  // public
  endRent(): void {
    this._endTime = Date.now();
  }
}

export default Rent;
