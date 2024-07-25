const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const canvasSize = canvas.width;
const totalCells = canvasSize / gridSize;

let snake = [{ x: 5, y: 5 }];
let direction = { x: 0, y: 0 };
let food = { x: Math.floor(Math.random() * totalCells), y: Math.floor(Math.random() * totalCells) };
let gameInterval;
let score = 0;

const scoreElement = document.getElementById('score');
const startButton = document.getElementById('startButton');
const endButton = document.getElementById('endButton');
const playerNameInput = document.getElementById('playerName');
const leaderboardList = document.getElementById('leaderboardList');

function drawCell(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
}

function drawSnake() {
    snake.forEach(segment => drawCell(segment.x, segment.y, 'lime'));
}

function drawFood() {
    drawCell(food.x, food.y, 'red');
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = { x: Math.floor(Math.random() * totalCells), y: Math.floor(Math.random() * totalCells) };
        score++;
        scoreElement.textContent = score;
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= totalCells || head.y < 0 || head.y >= totalCells) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
}

function gameLoop() {
    if (checkCollision()) {
        clearInterval(gameInterval);
        alert('Game Over');
        saveScore();
        displayLeaderboard();
        return;
    }

    ctx.clearRect(0, 0, canvasSize, canvasSize); // Clear the canvas
    drawFood();
    moveSnake();
    drawSnake();
}

function changeDirection(event) {
    const { key } = event;
    if (key === 'ArrowUp' && direction.y === 0) {
        direction = { x: 0, y: -1 };
    } else if (key === 'ArrowDown' && direction.y === 0) {
        direction = { x: 0, y: 1 };
    } else if (key === 'ArrowLeft' && direction.x === 0) {
        direction = { x: -1, y: 0 };
    } else if (key === 'ArrowRight' && direction.x === 0) {
        direction = { x: 1, y: 0 };
    }
}

function startGame() {
    snake = [{ x: 5, y: 5 }];
    direction = { x: 0, y: 0 };
    food = { x: Math.floor(Math.random() * totalCells), y: Math.floor(Math.random() * totalCells) };
    score = 0;
    scoreElement.textContent = score;
    gameInterval = setInterval(gameLoop, 100);
}

function endGame() {
    clearInterval(gameInterval);
    ctx.clearRect(0, 0, canvasSize, canvasSize); // Clear the canvas
}

function saveScore() {
    const playerName = playerNameInput.value.trim();
    if (!playerName) {
        return;
    }

    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({ name: playerName, score });
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

function displayLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboardList.innerHTML = leaderboard
        .sort((a, b) => b.score - a.score)
        .map(entry => `<li>${entry.name}: ${entry.score}</li>`)
        .join('');
}

document.addEventListener('keydown', changeDirection);
startButton.addEventListener('click', startGame);
endButton.addEventListener('click', endGame);
window.addEventListener('load', displayLeaderboard);
