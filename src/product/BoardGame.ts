import DifficultyLevel from './DifficultyLevel';
import Game from './Game';

const BOARD_GAME_MULTIPLIER = 1.6;

class BoardGame extends Game {
  constructor(serialNumber: string, basePrice: number, title: string, category: string, difficultyLevel: DifficultyLevel) {
    super(serialNumber, basePrice, title, category, difficultyLevel);
  }

  getProductInfo(): string {
    return `Board Game: ${this.title}, ${this.category}`;
  }

  getActualPrice(): number {
    return this.basePrice * BOARD_GAME_MULTIPLIER;
  }
}

export default BoardGame;