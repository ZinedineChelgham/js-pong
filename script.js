import PongGame from "./PongGame.js";

document.addEventListener("DOMContentLoaded", () => {
  const nbPlayers = 4;
  new PongGame(nbPlayers);
});
