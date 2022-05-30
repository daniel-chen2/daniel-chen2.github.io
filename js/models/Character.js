import { isKeyDown } from '../KeyPress.js';
import { CollisionEngine } from '../Game.js';

let directionImageXCropMap = {
    "right": 0,
    "left": 64,
    "up": 32,
    "down": 96
}

export class Character {
    constructor(position, velocity, imageSrc, collisionEngine = new CollisionEngine()) {
        this.position = position
        this.velocity = velocity
        this.playerImage = new Image()
        this.playerImage.src = imageSrc

        this.playerImageCropX = 32 * 18
        this.playerImageCropY = 64

        this.frame = 0
        this.direction = "down"

        // Helpers
        this.collisionEngine = collisionEngine
    }

    incrementFrame() {
        let spriteNumber = 60
        this.frame = (this.frame + 1) % spriteNumber
    }

    getSpriteNumber() {
        return Math.round(this.frame/12)
    }

    setCollisionEngine(collisionEngine) {
        this.collisionEngine = collisionEngine
    }

    setPlayerPosition(x, y) {
        if (!this.collisionEngine.hasCollided(x, y)) {
            this.position.y = y
            this.position.x = x
        }
    }

    movePlayer() {
        if (isKeyDown.up) {
            this.setPlayerPosition(this.position.x, this.position.y - this.velocity)
            this.playerImageCropX = (32 * 6) + this.getSpriteNumber() * 32
            this.playerImageCropY = (32 * 4)
            this.direction = "up"
            this.incrementFrame()
        }
        else if (isKeyDown.down) {
            this.setPlayerPosition(this.position.x, this.position.y + this.velocity)
            this.playerImageCropX = (32 * 18) + this.getSpriteNumber() * 32
            this.playerImageCropY =  (32 * 4)
            this.direction = "down"
            this.incrementFrame()
        }
        else if (isKeyDown.right) {
            this.setPlayerPosition(this.position.x + this.velocity, this.position.y)
            this.playerImageCropX = 0 + this.getSpriteNumber() * 32
            this.playerImageCropY =  (32 * 4)
            this.direction = "right"
            this.incrementFrame()
        }
        else if (isKeyDown.left) {
            this.setPlayerPosition(this.position.x - this.velocity, this.position.y)
            this.playerImageCropX = (12*32) + this.getSpriteNumber() * 32
            this.playerImageCropY =  (32 * 4)
            this.direction = "left"
            this.incrementFrame()
        }
        else {
            this.playerImageCropX = directionImageXCropMap[this.direction]
            this.playerImageCropY = 0
            this.frame = 0
        }
    }

    openHrefOfNearObject() {
        let collidedObj = this.collisionEngine.getCollidedObject()
        if (collidedObj != null && isKeyDown.enter) {
            window.open(collidedObj.href, '_blank');
        }
    }
}