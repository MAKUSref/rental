import CustomerType from "./CustomerType";

const MAX_PRODUCTS_NUMBER = 7;
const TYPE_NAME = 'Bronze';
const DISCOUNT = 0.9;

class Bronze extends CustomerType {
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

export default Bronze;
