"use strict";
// 1行目に記載している "use strict" は削除しないでください
console.log("分からない問題、壁にぶち当たった時に楽しみながら解決に取り組む");
console.log("とにかく前向きにプログラミングと向き合う");
console.log("論理的思考で仮説、検証を繰り返す");
const leftBtn = document.getElementById("left");
const centerBtn = document.getElementById("center");
const rightBtn = document.getElementById("right");

const shootBtn = document.getElementById("shootBtn");
const result = document.getElementById("result");
const keeper = document.getElementById("keeper");
const scoreText = document.getElementById("score");
const kickCountText = document.getElementById("kickCount");
const resetBtn = document.getElementById("reset");
const ball = document.getElementById("ball");
const keeperIcon = document.getElementById("keeperIcon");
const marker = document.getElementById("marker");
const perfect = document.getElementById("perfect");
const good = document.getElementById("good");
const miss = document.getElementById("miss");
const timer = document.getElementById("timer");
const countdown = document.getElementById("countdown");
let playerDirection = "";
leftBtn.addEventListener("click", function () {
  playerDirection = "left";
  leftBtn.style.backgroundColor = "orange";
});
centerBtn.addEventListener("click", function () {
  playerDirection = "center";
  centerBtn.style.backgroundColor = "orange";
});
rightBtn.addEventListener("click", function () {
  playerDirection = "right";
  rightBtn.style.backgroundColor = "orange";
});

const directions = ["left", "center", "right"];
let score = 0;
shootBtn.addEventListener("click", function () {
  if (timeLeft <= 0) {
    result.textContent = `ゲーム終了！ ${score}点！`;
    return;
  }

  if (playerDirection === "") {
    result.textContent = "方向を選んでください";
    result.style.color = "black";
    return;
  }
  let shootResult = "";

  console.log(position);
  if (position >= 45 && position <= 54) {
    shootResult = "PERFECT";
  } else if (
    (position >= 25 && position <= 44) ||
    (position >= 55 && position <= 74)
  ) {
    shootResult = "GOOD";
  } else if (
    (position >= 0 && position <= 24) ||
    (position >= 75 && position <= 100)
  ) {
    shootResult = "MISS";
  }
  const randomIndex = Math.floor(Math.random() * 3);
  const keeperDirection = directions[randomIndex];
  if (shootResult === "PERFECT") {
    score += 2;
    scoreText.textContent = `得点: ${score}`;
    result.textContent = "🔥PERFECT!!+2点🎉";
    result.style.color = "gold";
    resultReset();
  } else if (shootResult === "GOOD") {
    if (playerDirection === keeperDirection) {
      result.textContent = "🧤セーブ！";
      resultReset();
    } else {
      result.textContent = "⚽ゴール！+1点!";
      score++;
      scoreText.textContent = `得点: ${score}`;
      result.style.color = "rgb(0, 204, 255)";
      resultReset();
    }
  } else {
    result.textContent = "🥅枠外!";
    result.style.color = "red";
    resultReset();
  }
  console.log(keeperDirection);
  console.log(keeper);
  if (playerDirection === "left") {
    if (shootResult === "MISS") {
      ball.style.left = "10%";
      ball.style.bottom = "600px";
    } else {
      ball.style.left = "30%";

      ball.style.bottom = "540px";
    }
  }
  if (playerDirection === "center") {
    if (shootResult === "MISS") {
      if (Math.random() < 0.5) {
        ball.style.left = "10%";
      } else {
        ball.style.left = "90%";
      }
      ball.style.bottom = "600px";
    } else {
      ball.style.left = "50%";
      ball.style.bottom = "540px";
    }
  }
  if (playerDirection === "right") {
    if (shootResult === "MISS") {
      ball.style.left = "90%";
      ball.style.bottom = "600px";
    } else {
      ball.style.left = "70%";
      ball.style.bottom = "540px";
    }
  }

  setTimeout(function () {
    ball.style.left = "50%";
    ball.style.bottom = "300px";
    keeperIcon.style.left = "50%";
  }, 1000);
  playerDirection = "";
  resetButtonColor();
  if (keeperDirection === "left") {
    keeperIcon.style.left = "30%";
  }
  if (keeperDirection === "center") {
    keeperIcon.style.left = "50%";
  }
  if (keeperDirection === "right") {
    keeperIcon.style.left = "70%";
  }
});
resetBtn.addEventListener("click", function () {
  let count = 3;
  let countId;
  countdown.textContent = count;
  countId = setInterval(function () {
    count--;
    countdown.textContent = count;
    if (count <= 0) {
      countdown.textContent = "START!!";
      setTimeout(function () {
        countdown.textContent = "";
        startGame();
      }, 1000);
      clearInterval(countId);
    }
  }, 1000);
  clearInterval(markId);
  clearInterval(timeId);
  score = 0;
  playerDirection = "";
  timeLeft = 30;
  position = 0;
  direction = 1;
  marker.style.left = "0%";
  scoreText.textContent = "得点: 0";

  result.textContent = "";

  keeper.textContent = "";
});
let position = 0;
let direction = 1;
let markId;
let timeId;
let timeLeft = 30;

function startGame() {
  markId = setInterval(function () {
    if (timeLeft <= 10) {
      position += direction * 3;
    } else if (timeLeft <= 20) {
      position += direction * 2;
    } else {
      position += direction;
    }

    if (position >= 100) {
      direction = -1;
    }

    if (position <= 0) {
      direction = 1;
    }

    if (timeLeft <= 0) {
      clearInterval(markId);
    }

    marker.style.left = position + "%";
  }, 40);

  timeId = setInterval(function () {
    timeLeft--;

    timer.textContent = "残り時間：" + timeLeft + "秒";
    if (timeLeft <= 0) {
      clearInterval(timeId);
      resetBtn.textContent = "もう一度遊ぶ";
      result.textContent = `ゲーム終了！ ${score}点！`;
      result.style.color = "yellow";
      resetButtonColor();
    }
  }, 1000);
}
function resetButtonColor() {
  leftBtn.style.backgroundColor = "";
  centerBtn.style.backgroundColor = "";
  rightBtn.style.backgroundColor = "";

  leftBtn.style.color = "";
  centerBtn.style.color = "";
  rightBtn.style.color = "";
}
function resultReset() {
  setTimeout(function () {
    result.textContent = "";
  }, 1500);
}
