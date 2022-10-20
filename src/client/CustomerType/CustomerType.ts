abstract class CustomerType {
  applyDiscount?(price: number): number;
  getTypeInfo?(): string;
  getMaxProducts?(): number;
}

export default CustomerType;
