import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const background = new Image();
background.src = "/assets/images/space.png";

const playerBulletController = new BulletController(canvas, 10, "red", true);
const enemyBulletController = new BulletController(canvas, 4, "white", false);
const enemyController = new EnemyController(
  canvas,
  enemyBulletController,
  playerBulletController
);
const player = new Player(canvas, 3, playerBulletController);


let isGameOver = false;
let didWin = false;
let gameStart = false;

const playGame = function (fun) {
  setInterval(fun, 1000/60)
} 

const backSound = new Audio("/assets/sounds/bg.wav");
backSound.volume = 0.3;

const gameOverSound = new Audio("/assets/sounds/game-over.mp3");
gameOverSound.volume = 0.5;

const winSound = new Audio("/assets/sounds/win.wav")
winSound.volume = 1;

let loopAudio = 1

function game() {
  checkGameOver();
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  if (!isGameOver) {
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);
  }
  displayGameOver();
}

function displayGameOver() {
  if (isGameOver) {
    let text = didWin ? "You Win!" : "Game Over";
    let textOffset = didWin ? 4 : 5;

    ctx.fillStyle = "yellow";
    ctx.font = "40px 'Press Start 2P', system-ui";
    ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);

    ctx.font = "20px 'Press Start 2P', system-ui";
    ctx.fillText("F5 to Restart", canvas.width / 3, canvas.height / 2 + 30);
    gameStart = false;

    backSound.pause();
    backSound.currentTime = 0;

    if (didWin) {
      // Memutar suara kemenangan

      if (
        winSound.currentTime === 0 ||
        winSound.currentTime === winSound.duration
      ) {
        winSound.currentTime = 0;
        
        if(loopAudio <= 1){
          loopAudio++;
          winSound.play();
        }
      }
    } else {
      // Memutar suara game over
      if (
        gameOverSound.currentTime === 0 ||
        gameOverSound.currentTime === gameOverSound.duration
      ) {
        gameOverSound.currentTime = 0;
        if (loopAudio <= 2) {
          loopAudio++;
          console.log(loopAudio)
          gameOverSound.play();
        }
      }
    }
  }
}


function checkGameOver() {
  if (isGameOver) {
    return true;
  }

  if (enemyBulletController.collideWith(player)) {
    isGameOver = true;
    gameStart = false;
  }

  if (enemyController.collideWith(player)) {
    isGameOver = true;
    gameStart = false;
  }

  if (enemyController.enemyRows.length === 0) {
    didWin = true;
    isGameOver = true;
    gameStart = false;
  }
}

ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
ctx.fillStyle = "white";
ctx.font = "30px 'Press Start 2P', system-ui";
ctx.fillText("Click to Start", canvas.width / 5, canvas.height / 2);

document.addEventListener("keypress", function (event) {
  if(event.key === 'Enter' && !gameStart) {
    gameStart = true;
    backSound.currentTime = 0;
    backSound.play();
    playGame(game);
  }
});



canvas.addEventListener("click", function () {
  if (!gameStart) {
    gameStart = true;
    backSound.currentTime = 0;
    backSound.play();
    playGame(game);
  }
});
