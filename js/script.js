import {game} from './Game.js';

function animate() {
    window.requestAnimationFrame(animate);
    game.animateFrame()
}

// Main
animate()

