import uuid4 from "uuid4";
import Address from "./Address";
import ClientType from "./clientType/ClientType";
import Default from "./clientType/Default";

abstract class Client {
  private _name: string;
  private _surname: string;
  private _pid: string;
  private _address: Address;
  private _clientType: ClientType = new Default();

  constructor (name: string, surname: string, pid: string, address: Address) {
    this._name = name;
    this._surname = surname;
    this._pid = pid;
    this._address = address;
  }

  // getters
  get name() { return this._name; }
  get surname() { return this._surname; }
  get pid() { return this._pid; }
  get address() { return this._address; }
  
  get clientInfo() {
    return `${this._name} ${this._surname}, ${this._address.addressInfo}, ${this._clientType.getTypeInfo?.()}`;
  }

  get maxProducts() {
    return this._clientType.getMaxProducts?.();
  }

  // setters
  set clientType(clientType: ClientType) {
    this._clientType = clientType;
  }

  set name(name: string) {
    this._name = name;
  }

  set surname(surname: string) {
    this._surname = surname;
  }
  
  // public
  applyDiscount(price: number): number {
    return this._clientType.applyDiscount?.(price) ?? price;
  }
}

export default Client;
