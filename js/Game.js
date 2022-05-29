// Stores/Updates Elements and Animates the Game
export class Game {
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
        // console.log("hello")
        this.character.movePlayerAndSetCollidedObject()
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
        this.context.createPattern(this.gameMap.backgroundImage, "no-repeat")
        this.context.drawImage(this.gameMap.backgroundImage, this.character.position.x * -1, this.character.position.y * -1)
    }

    drawCharacter() {
        this.context.drawImage(
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
    }

    hasCollidedIntoObject(x, y) {
        this.setCollidedObject(x,y)
        return this.collisionMap.some(function (obj) {
            return y > obj.topSide - 10 && // up boundary
                y < obj.bottomSide + 10 &&
                x > obj.leftSide - 10 &&
                x < obj.rightSide + 10
        })
    }

    setCollidedObjectAndReturnTrueIfCollided(x, y) {
        return this.setCollidedObject(x,y) !== null
    }

    hasCollided(x, y) {
        return (
            y < (this.backgroundImage.height - 400) * -0.5 || // up boundary
            y > this.backgroundImage.height * 0.5 ||
            x < (this.backgroundImage.width - 200) * -0.5 ||
            x > (this.backgroundImage.width + 100) * 0.5 ||
            this.hasCollidedIntoObject(x, y)
        )
    }
}