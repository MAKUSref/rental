import Product from "./Product";
import DifficultyLevel from "./DifficultyLevel";

abstract class Game extends Product {
  private _difficultyLevel: DifficultyLevel;

  constructor (serialNumber: string, basePrice: number, title: string, category: string, difficultyLevel: DifficultyLevel) {
    super(serialNumber, basePrice, title, category);
    this._difficultyLevel = difficultyLevel;
  }

  get difficultyLevel() {
    return this._difficultyLevel;
  }

  getActualPrice?(): number;
  getProductInfo?(): string;
}

export default Game;