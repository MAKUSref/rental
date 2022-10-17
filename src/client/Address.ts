class Address {
  private _city: string;
  private _number: string;
  private _street: string;

  constructor(city: string, number: string, street: string) {
    this._city = city;
    this._number = number;
    this._street = street;
  }

  get city(): string {
    return this._city;
  }

  get number(): string {
    return this._number;
  }

  get street(): string {
    return this._street;
  }

  get addressInfo(): string {
    return `${this._city}, ${this._street}, ${this._number}`;
  }
}

export default Address;
