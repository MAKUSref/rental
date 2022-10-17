import Product from "./Product";

const MOVIE_MULTIPLIER = 1.25;

class Movie extends Product {
  constructor(basePrice: number, title: string, category: string) {
    super(basePrice, title, category);
  }

  getProductInfo(): string {
    return `Movie: ${this.title}, ${this.category}`;
  }

  getActualPrice(): number {
    return this.basePrice * MOVIE_MULTIPLIER;
  }
}

export default Movie;