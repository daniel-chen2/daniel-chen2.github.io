import { Character } from './models/Character.js';
import { GameMap } from './models/GameMap.js';
import { Game } from './Game.js';

// Macros
const canvas = document.getElementById("pokemonCanvas");
canvas.width = 1024
canvas.height = 576
let velocity = 2.5

export let character = new Character({ x: 0, y: 0 }, velocity, '../imgs/characterSheet.png')
let gameMap = new GameMap(canvas.width, canvas.height, "../imgs/mapBackground.png", null, null)

let collisionMap = [
    {
        name: "resume",
        href: "https://github.com/daniel-chen2/resume/blob/main/resume.pdf",
        leftSide: -460,
        rightSide: -265,
        bottomSide: -30,
        topSide: -180
    },
    {
        name: "bed",
        href: "https://www.youtube.com/watch?v=QRZ7VS7uJHI&ab_channel=AllieWiggle",
        leftSide: -460,
        rightSide: -265,
        bottomSide: 277,
        topSide: 110
    },
    {
        name: "table",
        leftSide: -50,
        rightSide: 230,
        bottomSide: 277,
        topSide: 110
    }
]

export const game = new Game(
    gameMap,
    character,
    canvas,
    collisionMap
)

// Main
function animate() {
    window.requestAnimationFrame(animate);
    game.animateFrame()
}
animate()

