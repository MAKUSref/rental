import CustomerType from "./CustomerType";

const MAX_PRODUCTS_NUMBER = 5;
const TYPE_NAME = 'Default';
const DISCOUNT = 1;

class Default extends CustomerType {
  applyDiscount(price: number): number {
    return price * DISCOUNT;
  }

  getTypeInfo(): string {
    return TYPE_NAME;
  }

  getMaxProducts(): number {
    return MAX_PRODUCTS_NUMBER;
  }
}

export default Default;
