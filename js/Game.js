import { Character } from './models/Character.js';
import { GameMap } from './models/GameMap.js';

const canvas = document.getElementById("pokemonCanvas");
const context = canvas.getContext("2d");

canvas.width = 1024
canvas.height = 576

const mapImage = new Image()
mapImage.src = "../imgs/mapBackground.png"

const playerImage = new Image()
playerImage.src = '../imgs/characterSheet.png'

context.drawImage(playerImage, 0, 0)

// Stores/Updates Elements and Animates the Game
class Game {
    constructor(gameMap, character, canvas, collisionMap) {
        this.gameMap = gameMap;
        this.character = character;
        this.canvas = canvas;
        this.context = canvas.getContext("2d");

        // Helper Classes
        this.framePainter = new FramePainter(this.gameMap, this.character, this.canvas)
        this.collisionEngine = new CollisionEngine(collisionMap, this.gameMap.backgroundImage)

        // Set Collision engine
        this.character.setCollisionEngine(this.collisionEngine)
    }

    animateFrame() {
        this.character.executePlayerActions()
        this.framePainter.repaintGameFrame(this.canvas, this.context, this.gameMap, this.character)
    }
}

// Frame Painter
class FramePainter {
    constructor(gameMap, character, canvas) {
        this.gameMap = gameMap;
        this.character = character;
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
    }

    repaintGameFrame(canvas, context, gameMap, character) {
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        this.drawGameMap()
        this.drawCharacter()
    }

    drawGameMap() {
        context.createPattern(this.gameMap.backgroundImage, "no-repeat")
        context.drawImage(this.gameMap.backgroundImage, this.character.position.x * -1, this.character.position.y * -1)
    }

    drawCharacter() {
        context.drawImage(
            this.character.playerImage,
            this.character.playerImageCropX,
            this.character.playerImageCropY,
            32,
            64,
            (this.canvas.width / 2) - 16,
            this.canvas.height / 2 - 32,
            64,
            128
        )
    }
}

export class CollisionEngine {
    constructor(collisionMap, backgroundImage) {
        this.backgroundImage = backgroundImage
        this.collisionMap = collisionMap
        this.collidedObject = null
    }

    getCollidedObject() {
        return this.collidedObject
    }

    setCollidedObject(x, y) {
        this.collidedObject = this.collisionMap.find(function (obj) {
            return y > obj.topSide - 10 && // up boundary
                y < obj.bottomSide + 10 &&
                x > obj.leftSide - 10 &&
                x < obj.rightSide + 10
        })
        return this.collidedObject
    }

    hasCollidedIntoObject(x, y) {
        this.setCollidedObject(x,y)
        this.collidedObject = this.collisionMap.some(function (obj) {
            return y > obj.topSide - 10 && // up boundary
                y < obj.bottomSide + 10 &&
                x > obj.leftSide - 10 &&
                x < obj.rightSide + 10
        })
        return this.collidedObject
    }

    setCollidedObjectAndReturnTrueIfCollided(x, y) {
        return this.setCollidedObject(x,y) !== null
    }

    hasCollided(x, y) {
        console.log(this.hasCollidedIntoObject(x, y))
        console.log(this.backgroundImage.height)
        return (
            y < (this.backgroundImage.height - 400) * -0.5 || // up boundary
            y > this.backgroundImage.height * 0.5 ||
            x < (this.backgroundImage.width - 200) * -0.5 ||
            x > (this.backgroundImage.width + 100) * 0.5 ||
            this.hasCollidedIntoObject(x, y)
        )
    }
}

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
    new GameMap(canvas.width, canvas.height, "../imgs/mapBackground.png", null, null),
    new Character({ x: 0, y: 0 }, 5, '../imgs/characterSheet.png'),
    canvas,
    collisionMap
)
