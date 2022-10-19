import DifficultyLevel from './DifficultyLevel';
import Game from './Game';

const VIDEO_GAME_MULTIPLIER = 1.6;

class VideoGame extends Game {
  constructor(serialNumber: string, basePrice: number, title: string, category: string, difficultyLevel: DifficultyLevel) {
    super(serialNumber, basePrice, title, category, difficultyLevel);
  }

  getProductInfo(): string {
    return `Video Game: ${this.title}, ${this.category}`;
  }

  getActualPrice(): number {
    return this.basePrice * VIDEO_GAME_MULTIPLIER;
  }
}

export default VideoGame;