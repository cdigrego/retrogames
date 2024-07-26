document.addEventListener('DOMContentLoaded', () => {
    const game = document.getElementById('game');
    const pacman = document.getElementById('pacman');
    const ghost1 = document.getElementById('ghost1');
    const ghost2 = document.getElementById('ghost2');
    const step = 30; // Step size in pixels
    const gameSize = 600; // Size of the game board

    let pacmanX = 0;
    let pacmanY = 0;
    let ghost1X = 3 * step;
    let ghost1Y = 3 * step;
    let ghost2X = 5 * step;
    let ghost2Y = 5 * step;

    // Labirinto di esempio
    const walls = [
    { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 },
    { x: 1, y: 2 }, { x: 4, y: 2 },
    { x: 1, y: 3 }, { x: 4, y: 3 },
    { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 },
    { x: 6, y: 1 }, { x: 7, y: 1 }, { x: 8, y: 1 },
    { x: 6, y: 2 }, { x: 8, y: 2 },
    { x: 6, y: 3 }, { x: 8, y: 3 },
    { x: 6, y: 4 }, { x: 7, y: 4 }, { x: 8, y: 4 },
    { x: 10, y: 6 }, { x: 11, y: 6 }, { x: 12, y: 6 }, { x: 13, y: 6 },
    { x: 10, y: 7 }, { x: 13, y: 7 },
    { x: 10, y: 8 }, { x: 13, y: 8 },
    { x: 10, y: 9 }, { x: 11, y: 9 }, { x: 12, y: 9 }, { x: 13, y: 9 },
    { x: 15, y: 11 }, { x: 16, y: 11 }, { x: 17, y: 11 },
    { x: 15, y: 12 }, { x: 17, y: 12 },
    { x: 15, y: 13 }, { x: 17, y: 13 },
    { x: 15, y: 14 }, { x: 16, y: 14 }, { x: 17, y: 14 }
];


    walls.forEach(wall => {
        const wallElement = document.createElement('div');
        wallElement.classList.add('wall');
        wallElement.style.left = wall.x * step + 'px';
        wallElement.style.top = wall.y * step + 'px';
        game.appendChild(wallElement);
    });

    // Punti da mangiare
    const dots = [];
    for (let y = 0; y < gameSize / step; y++) {
        for (let x = 0; x < gameSize / step; x++) {
            if (!walls.some(wall => wall.x === x && wall.y === y)) {
                const dotElement = document.createElement('div');
                dotElement.classList.add('dot');
                dotElement.style.left = x * step + 10 + 'px';
                dotElement.style.top = y * step + 10 + 'px';
                game.appendChild(dotElement);
                dots.push({ x: x * step, y: y * step, element: dotElement });
            }
        }
    }

    // Posizionamento iniziale dei fantasmi
    ghost1.style.left = ghost1X + 'px';
    ghost1.style.top = ghost1Y + 'px';
    ghost2.style.left = ghost2X + 'px';
    ghost2.style.top = ghost2Y + 'px';

    document.addEventListener('keydown', (e) => {
        let newX = pacmanX;
        let newY = pacmanY;

        switch (e.key) {
            case 'ArrowUp':
                newY -= step;
                break;
            case 'ArrowDown':
                newY += step;
                break;
            case 'ArrowLeft':
                newX -= step;
                break;
            case 'ArrowRight':
                newX += step;
                break;
        }

        if (canMove(newX, newY)) {
            pacmanX = newX;
            pacmanY = newY;
            pacman.style.top = pacmanY + 'px';
            pacman.style.left = pacmanX + 'px';
            checkDotCollision();
            checkGhostCollision();
        }
    });

    function canMove(x, y) {
        if (x < 0 || x >= gameSize || y < 0 || y >= gameSize) return false;

        for (const wall of walls) {
            if (wall.x * step === x && wall.y * step === y) return false;
        }

        return true;
    }

    function checkDotCollision() {
        for (let i = 0; i < dots.length; i++) {
            const dot = dots[i];
            if (pacmanX + 10 === dot.x + 10 && pacmanY + 10 === dot.y + 10) {
                dot.element.remove();
                dots.splice(i, 1);
                break;
            }
        }
    }

    function checkGhostCollision() {
        if (
            (pacmanX === ghost1X && pacmanY === ghost1Y) ||
            (pacmanX === ghost2X && pacmanY === ghost2Y)
        ) {
            alert('Game Over!');
            location.reload();
        }
    }

    function moveGhosts() {
        moveGhost(ghost1, ghost1X, ghost1Y);
        moveGhost(ghost2, ghost2X, ghost2Y);
        checkGhostCollision();
    }

    function moveGhost(ghost, ghostX, ghostY) {
        let directions = [
            { x: ghostX + step, y: ghostY },
            { x: ghostX - step, y: ghostY },
            { x: ghostX, y: ghostY + step },
            { x: ghostX, y: ghostY - step }
        ];

        directions = directions.filter(dir => canMove(dir.x, dir.y));

        if (directions.length > 0) {
            const move = directions[Math.floor(Math.random() * directions.length)];
            ghost.style.left = move.x + 'px';
            ghost.style.top = move.y + 'px';

            if (ghost === ghost1) {
                ghost1X = move.x;
                ghost1Y = move.y;
            } else {
                ghost2X = move.x;
                ghost2Y = move.y;
            }
        }
    }

    setInterval(moveGhosts, 500);
});