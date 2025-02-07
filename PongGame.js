import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const GAIN = 0.025;
export default class PongGame {
  constructor(numPlayers) {
    this.ball = new Ball(document.getElementById("ball"));
    this.paddles = {
      left: new Paddle(document.getElementById("player-paddle-left")),
      right: new Paddle(document.getElementById("player-paddle-right")),
      top: new Paddle(document.getElementById("player-paddle-top"), true),
      bot: new Paddle(document.getElementById("player-paddle-bot"), true),
    };
    this.botPaddles = [];
    this.lastTime = null;
    this.initEventListeners();
    this.score = 0;
    this.scoreElement = document.createElement("div");
    this.scoreElement.className = "score-display";

    document.querySelector(".score-container").appendChild(this.scoreElement);

    window.requestAnimationFrame(this.update.bind(this));

    for (let i = numPlayers; i < 4; i++) {
      const arr = Object.keys(this.paddles);
      this.botPaddles.push(this.paddles[arr[i]]);
    }
  }

  updateScore(newScore) {
    this.score = newScore;
    this.scoreElement.textContent = "Score\n" + this.score.toFixed(2);
  }

  initEventListeners() {
    const addControllerListeners = (controllerGroup, playerPaddle) => {
      for (const btn of controllerGroup.children) {
        let intervalHandler;
        btn.addEventListener("mousedown", (e) => {
          console.log(e.target.innerText);
          const direction = e.target.innerText === "←" ? "left" : "right";
          intervalHandler = setInterval(() => {
            this.continuousMove(intervalHandler, direction, playerPaddle);
          }, 50); // Adjust the interval as needed
        });
      }
    };

    // Add event listeners based on the paddles present
    if (this.paddles.left) {
      addControllerListeners(
        document.getElementById("left-btn"),
        this.paddles.left
      );
    }
    if (this.paddles.right) {
      addControllerListeners(
        document.getElementById("right-btn"),
        this.paddles.right
      );
    }
    if (this.paddles.top) {
      addControllerListeners(
        document.getElementById("top-btn"),
        this.paddles.top
      );
    }
    if (this.paddles.bot) {
      addControllerListeners(
        document.getElementById("bottom-btn"),
        this.paddles.bot
      );
    }
  }

  continuousMove(intervalHandler, direction, padde) {
    const moveInterval = setInterval(() => {
      if (direction === "left") {
        padde.position -= 1;
      } else if (direction === "right") {
        padde.position += 1;
      }
    }, 50);

    document.addEventListener("mouseup", () => {
      clearInterval(moveInterval);
      clearInterval(intervalHandler);
    });
  }

  update(time) {
    if (this.lastTime != null) {
      const delta = time - this.lastTime;
      this.updateScore(this.score + GAIN); // Increment score for demonstration

      // Update the ball position
      this.ball.update(
        delta,
        Object.values(this.paddles).map((paddle) => paddle.rect())
      );

      // Update the paddle positions of bots
      this.botPaddles.forEach((paddle) => {
        paddle.update(delta, this.ball.y);
      });

      // Update hue for visual effect, optional
      const hue = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--hue")
      );
      document.documentElement.style.setProperty("--hue", hue + delta * 0.01);

      // Check for scoring
      if (this.isLose()) {
        this.handleLose();
      }
    }

    this.lastTime = time;
    window.requestAnimationFrame(this.update.bind(this));
  }

  isLose() {
    const rect = this.ball.rect();
    return (
      rect.right >= window.innerWidth ||
      rect.left <= 0 ||
      rect.bottom >= window.innerHeight ||
      rect.top <= 0
    );
  }

  handleLose() {
    //const rect = this.ball.rect();
    // if (rect.right >= window.innerWidth) {
    //   playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
    // } else {
    //   computerScoreElem.textContent =
    //     parseInt(computerScoreElem.textContent) + 1;
    // }
    this.ball.reset();
    this.botPaddles.forEach((paddle) => {
      paddle.reset();
    });
    this.score = 0;
  }
}
