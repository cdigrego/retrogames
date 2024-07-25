document.addEventListener('DOMContentLoaded', () => {
    const pacman = document.getElementById('pacman');
    const game = document.getElementById('game');
    const step = 30; // Step size in pixels
    const gameSize = 600; // Size of the game board

    let pacmanX = 0;
    let pacmanY = 0;

    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                if (pacmanY > 0) pacmanY -= step;
                break;
            case 'ArrowDown':
                if (pacmanY < gameSize - step) pacmanY += step;
                break;
            case 'ArrowLeft':
                if (pacmanX > 0) pacmanX -= step;
                break;
            case 'ArrowRight':
                if (pacmanX < gameSize - step) pacmanX += step;
                break;
        }
        pacman.style.top = pacmanY + 'px';
        pacman.style.left = pacmanX + 'px';
    });
});
