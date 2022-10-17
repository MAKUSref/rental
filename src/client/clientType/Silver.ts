import ClientType from "./ClientType";

const MAX_PRODUCTS_NUMBER = 10;
const TYPE_NAME = 'Silver';
const DISCOUNT = 0.75;

class Silver extends ClientType {
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

export default Silver;
