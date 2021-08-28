export default class Game {
  constructor() {
    this.rounds = 0;
    this.score = {
      prevScore: 0,
      currentScore: 0,
      scoreRect: document.getElementById("score").getBoundingClientRect(),
    };

    this.gameOver = false;
    this.target_swatch = { color: [] };
    this.player_swatch = { color: [] };
  }

  addPoints = (points) => {
    this.score.currentScore += points;
    return this.score.currentScore;
  };

  nextRound = () => {
    this.rounds += 1;
    this.gameOver = this.rounds === 10;
  };
  //  box = document.getElementById("tv").getBoundingClientRect();
  //  x = box.left + (box.width * 0.802);
  //  y = box.top + (box.height * 0.504);

  redraw() {
    // get boundingRect of the
  }

  fetchScoreRect() {
    this.score[scoreRect] = document
      .getElementById("score")
      .getBoundingClientRect();
  }
}
