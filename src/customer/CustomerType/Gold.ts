import CustomerType from "./CustomerType";

const MAX_PRODUCTS_NUMBER = 15;
const TYPE_NAME = 'Gold';
const DISCOUNT = 0.5;

class Gold extends CustomerType {
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

export default Gold;
