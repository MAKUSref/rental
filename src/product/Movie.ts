import Product from "./Product";

const MOVIE_MULTIPLIER = 1.25;

class Movie extends Product {
  constructor(serialNumber: string, basePrice: number, title: string, category: string) {
    super(serialNumber, basePrice, title, category);
  }

  getProductInfo(): string {
    return `Movie: ${this.title}, ${this.category}`;
  }

  getActualPrice(): number {
    return this.basePrice * MOVIE_MULTIPLIER;
  }
}

export default Movie;