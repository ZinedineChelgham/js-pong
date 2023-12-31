import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddleLeft = new Paddle(
  document.getElementById("player-paddle-left")
);
const playerPaddleRight = new Paddle(
  document.getElementById("player-paddle-right")
);
const playerPaddleTop = new Paddle(
  document.getElementById("player-paddle-top"),
  true
);
const playerPaddleBot = new Paddle(
  document.getElementById("player-paddle-bot"),
  true
);

//const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");

// Event listeners for the new button groups
const leftControllers = document.getElementById("left-btn");

const rightControllers = document.getElementById("right-btn");

const topControllers = document.getElementById("top-btn");

const bottomControllers = document.getElementById("bottom-btn");

let lastTime;
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime;
    ball.update(delta, [
      playerPaddleLeft.rect(),
      playerPaddleRight.rect(),
      playerPaddleTop.rect(),
      playerPaddleBot.rect(),
    ]);
    // computerPaddle.update(delta, ball.y);
    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    );

    document.documentElement.style.setProperty("--hue", hue + delta * 0.01);

    if (isLose()) handleLose();
  }

  lastTime = time;
  window.requestAnimationFrame(update);
}

function isLose() {
  const rect = ball.rect();
  return (
    rect.right >= window.innerWidth ||
    rect.left <= 0 ||
    rect.bottom >= window.innerHeight ||
    rect.top <= 0
  );
}

function handleLose() {
  const rect = ball.rect();
  if (rect.right >= window.innerWidth) {
    // playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
  } else {
    // computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
  }
  ball.reset();
  // computerPaddle.reset();
}

document.addEventListener("mousemove", (e) => {
  //playerPaddleLeft.position = (e.y / window.innerHeight) * 100;
});

for (const btn of leftControllers.children) {
  btn.addEventListener("click", (e) => {
    console.log(e.target.innerText);
    if (e.target.innerText == "←") playerPaddleLeft.position -= 1;
    else playerPaddleLeft.position += 1;
  });
}

// Function to handle continuous movement when a button is held down
function continuousMove(intervalHandler, direction, padde) {
  const moveInterval = setInterval(() => {
    // Add your logic for continuous movement here
    // For example, update the paddle position based on the direction
    if (direction === "left") {
      // Logic for left movement
      padde.position -= 1;
    } else if (direction === "right") {
      // Logic for right movement
      padde.position += 1;
    }
  }, 50); // Adjust the interval as needed

  // Stop the movement when the button is released
  document.addEventListener("mouseup", () => {
    clearInterval(moveInterval);
    clearInterval(intervalHandler);
  });
}

// Event listeners for left button clicks
for (const btn of leftControllers.children) {
  let intervalHandler;
  btn.addEventListener("mousedown", (e) => {
    console.log(e.target.innerText);
    if (e.target.innerText === "←") {
      intervalHandler = setInterval(() => {
        continuousMove(intervalHandler, "left", playerPaddleLeft);
      }, 50); // Adjust the interval as needed
    } else if (e.target.innerText === "→") {
      intervalHandler = setInterval(() => {
        continuousMove(intervalHandler, "right", playerPaddleLeft);
      }, 50); // Adjust the interval as needed
    }
  });
}

for (const btn of rightControllers.children) {
  let intervalHandler;
  btn.addEventListener("mousedown", (e) => {
    console.log(e.target.innerText);
    if (e.target.innerText === "←") {
      intervalHandler = setInterval(() => {
        continuousMove(intervalHandler, "left", playerPaddleRight);
      }, 50); // Adjust the interval as needed
    } else if (e.target.innerText === "→") {
      intervalHandler = setInterval(() => {
        continuousMove(intervalHandler, "right", playerPaddleRight);
      }, 50); // Adjust the interval as needed
    }
  });
}

for (const btn of topControllers.children) {
  let intervalHandler;
  btn.addEventListener("mousedown", (e) => {
    console.log(e.target.innerText);
    if (e.target.innerText === "←") {
      intervalHandler = setInterval(() => {
        continuousMove(intervalHandler, "left", playerPaddleTop);
      }, 50); // Adjust the interval as needed
    } else if (e.target.innerText === "→") {
      intervalHandler = setInterval(() => {
        continuousMove(intervalHandler, "right", playerPaddleTop);
      }, 50); // Adjust the interval as needed
    }
  });
}

for (const btn of bottomControllers.children) {
  let intervalHandler;
  btn.addEventListener("mousedown", (e) => {
    console.log(e.target.innerText);
    if (e.target.innerText === "←") {
      intervalHandler = setInterval(() => {
        continuousMove(intervalHandler, "left", playerPaddleBot);
      }, 50); // Adjust the interval as needed
    } else if (e.target.innerText === "→") {
      intervalHandler = setInterval(() => {
        continuousMove(intervalHandler, "right", playerPaddleBot);
      }, 50); // Adjust the interval as needed
    }
  });
}

window.requestAnimationFrame(update);
