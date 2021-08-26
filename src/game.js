export default class Game {
  constructor() {
    this.rounds = 0;
    this.score = 0;
    this.gameOver = false;
    this.target_swatch = { color: [] };
    this.player_swatch = { color: [] };
  }

  addPoints = (points) => {
    this.score += points;
  };

  nextRound = () => {
    this.rounds += 1;
    this.gameOver = this.rounds === 10;
  };
}
