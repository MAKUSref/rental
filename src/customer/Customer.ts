import uuid4 from "uuid4";
import Address from "./Address";
import CustomerType from "./CustomerType/CustomerType";
import Default from "./CustomerType/Default";

class Customer {
  private _name: string;
  private _surname: string;
  private _pid: string;
  private _address: Address;
  private _CustomerType: CustomerType = new Default();

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
  
  get CustomerInfo() {
    return `${this._name} ${this._surname}, ${this._address.addressInfo}, ${this._CustomerType.getTypeInfo?.()}`;
  }

  get maxProducts() {
    return this._CustomerType.getMaxProducts?.();
  }

  // setters
  set CustomerType(CustomerType: CustomerType) {
    this._CustomerType = CustomerType;
  }

  set name(name: string) {
    this._name = name;
  }

  set surname(surname: string) {
    this._surname = surname;
  }
  
  // public
  applyDiscount(price: number): number {
    return this._CustomerType.applyDiscount?.(price) ?? price;
  }
}

export default Customer;
