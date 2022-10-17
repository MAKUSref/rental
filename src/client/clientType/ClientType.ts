abstract class ClientType {
  applyDiscount?(price: number): number;
  getTypeInfo?(): string;
  getMaxProducts?(): number;
}

export default ClientType;
