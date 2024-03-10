let canvas = document.getElementById("gameCanvas");
let c = canvas.getContext("2d");
let span = document.querySelector("span");
let btn = document.getElementById("btn");
let width = canvas.width;
let height = canvas.height;
let score = 0;
let foodX;
let foodY;
let running = false;
let foodColor = "red";
let snakeColor = "green";
let unitSize = 20;
let Xvelocity = unitSize;
let Yvelocity = 0;
let snake = [
  {x: unitSize * 4, y: 0},
  {x: unitSize * 3, y: 0},
  {x: unitSize * 2, y: 0},
  {x: unitSize, y: 0}
];

document.addEventListener("keydown", changeDirection);
btn.addEventListener("click", reset);
gameStart();

function gameStart() {
  running = true;
  createFood();
  mainLoop();
}

function mainLoop() {
  if (running) {
    setTimeout(() => {
      clearBoard();
      drawSnake();
      drawFood();
      moveSnake();
      checkGameOver();
      mainLoop();
    }, 75);
  } else {
    displayGameOver();
  }
}

function clearBoard() {
  c.fillStyle = "white";
  c.fillRect(0, 0, width, height);
}

function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    c.fillStyle = snakeColor;
    c.fillRect(snake[i].x, snake[i].y, unitSize, unitSize);
    c.strokeStyle = "black";
    c.strokeRect(snake[i].x, snake[i].y, unitSize, unitSize);
  }
}

function createFood() {
  const randomFood = () => Math.floor(Math.random() * (width / unitSize)) * unitSize;
  foodX = randomFood();
  foodY = randomFood();

  // Check if the food is placed on the snake, and regenerate if needed
  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x === foodX && snake[i].y === foodY) {
      createFood();
      return;
    }
  }
}

function drawFood() {
  c.fillStyle = foodColor;
  c.fillRect(foodX, foodY, unitSize, unitSize);
}

function moveSnake() {
  const head = {
    x: snake[0].x + Xvelocity,
    y: snake[0].y + Yvelocity
  };
  snake.unshift(head);

  if (snake[0].x === foodX && snake[0].y === foodY) {
    score += 1;
    span.innerHTML = score;
    createFood();
  } else {
    snake.pop();
  }
}

function changeDirection(event) {
  const keyPressed = event.keyCode;
  const left = 37;
  const right = 39;
  const top = 38;
  const down = 40;

  if (keyPressed === left && Xvelocity !== unitSize) {
    Xvelocity = -unitSize;
    Yvelocity = 0;
  } else if (keyPressed === right && Xvelocity !== -unitSize) {
    Xvelocity = unitSize;
    Yvelocity = 0;
  } else if (keyPressed === top && Yvelocity !== unitSize) {
    Xvelocity = 0;
    Yvelocity = -unitSize;
  } else if (keyPressed === down && Yvelocity !== -unitSize) {
    Xvelocity = 0;
    Yvelocity = unitSize;
  }
}

function reset() {
  score = 0;
  Xvelocity = unitSize;
  Yvelocity = 0;
  snake = [
    {x: unitSize * 4, y: 0},
    {x: unitSize * 3, y: 0},
    {x: unitSize * 2, y: 0},
    {x: unitSize, y: 0}
  ];
  running = true;
  clearBoard();
  gameStart();
}

function checkGameOver() {
  switch (true) {
    case (snake[0].x < 0):
    case (snake[0].x >= width):
    case (snake[0].y < 0):
    case (snake[0].y >= height):
      running = false;
      break;
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      running = false;
      break;
    }
  }
}

function displayGameOver() {
  c.font = "50px MV Boli";
  c.fillStyle = "black";
  c.textAlign = "center";
  c.fillText("GAME OVER", width / 2, height / 2);
}