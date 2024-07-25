document.addEventListener('DOMContentLoaded', () => {
    const game = document.getElementById('game');
    const pacman = document.getElementById('pacman');
    const step = 30; // Step size in pixels
    const gameSize = 600; // Size of the game board

    let pacmanX = 0;
    let pacmanY = 0;

    // Generate walls
    const walls = [
        { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 },
        { x: 1, y: 2 }, { x: 3, y: 2 },
        { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 },
    ];

    walls.forEach(wall => {
        const wallElement = document.createElement('div');
        wallElement.classList.add('wall');
        wallElement.style.left = wall.x * step + 'px';
        wallElement.style.top = wall.y * step + 'px';
        game.appendChild(wallElement);
    });

    // Generate dots
    const dots = [
        { x: 4, y: 4 }, { x: 5, y: 5 },
    ];

    dots.forEach(dot => {
        const dotElement = document.createElement('div');
        dotElement.classList.add('dot');
        dotElement.style.left = dot.x * step + 10 + 'px'; // Center the dot
        dotElement.style.top = dot.y * step + 10 + 'px'; // Center the dot
        game.appendChild(dotElement);
    });

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
        const dotElements = document.querySelectorAll('.dot');
        dotElements.forEach(dot => {
            const dotX = parseInt(dot.style.left);
            const dotY = parseInt(dot.style.top);
            if (pacmanX + 10 === dotX && pacmanY + 10 === dotY) {
                dot.remove();
            }
        });
    }
});
