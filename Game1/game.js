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

// Funzione per disegnare una cella del serpente o del cibo
function drawCell(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
}

// Funzione per disegnare il serpente
function drawSnake() {
    snake.forEach(segment => drawCell(segment.x, segment.y, 'lime'));
}

// Funzione per disegnare il cibo
function drawFood() {
    drawCell(food.x, food.y, 'red');
}

// Funzione per spostare il serpente
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

// Funzione per controllare le collisioni
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

// Funzione principale del gioco
function gameLoop() {
    if (checkCollision()) {
        clearInterval(gameInterval);
        alert('Game Over');
        saveScore();
        displayLeaderboard();
        return;
    }

    ctx.clearRect(0, 0, canvasSize, canvasSize); // Pulisce il canvas
    drawFood();
    moveSnake();
    drawSnake();
}

// Funzione per cambiare la direzione del serpente in base all'input della tastiera
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

// Funzione per cambiare la direzione del serpente in base ai pulsanti sullo schermo
function changeDirectionFromButton(directionButton) {
    switch (directionButton) {
        case 'up':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'down':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'left':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'right':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
}

// Funzione per iniziare il gioco
function startGame() {
    snake = [{ x: 5, y: 5 }];
    direction = { x: 0, y: 0 };
    food = { x: Math.floor(Math.random() * totalCells), y: Math.floor(Math.random() * totalCells) };
    score = 0;
    scoreElement.textContent = score;
    gameInterval = setInterval(gameLoop, 100);
}

// Funzione per terminare il gioco
function endGame() {
    clearInterval(gameInterval);
    ctx.clearRect(0, 0, canvasSize, canvasSize); // Pulisce il canvas
}

// Funzione per salvare il punteggio
function saveScore() {
    const playerName = playerNameInput.value.trim();
    if (!playerName) {
        return;
    }

    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({ name: playerName, score });
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

// Funzione per visualizzare la leaderboard
function displayLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboardList.innerHTML = leaderboard
        .sort((a, b) => b.score - a.score)
        .map(entry => `<li>${entry.name}: ${entry.score}</li>`)
        .join('');
}

// Gestione degli eventi
document.addEventListener('keydown', changeDirection);

// Pulsanti per avviare e terminare il gioco
startButton.addEventListener('click', startGame);
endButton.addEventListener('click', endGame);

// Pulsanti per i controlli sullo schermo
document.getElementById('up').addEventListener('click', () => changeDirectionFromButton('up'));
document.getElementById('down').addEventListener('click', () => changeDirectionFromButton('down'));
document.getElementById('left').addEventListener('click', () => changeDirectionFromButton('left'));
document.getElementById('right').addEventListener('click', () => changeDirectionFromButton('right'));

// Visualizzazione della leaderboard all'avvio della pagina
window.addEventListener('load', displayLeaderboard);
