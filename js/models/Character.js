import { isKeyDown } from '../KeyPress.js';
import { CollisionEngine } from '../Game.js';

export class Character {
    constructor(position, velocity, imageSrc, collisionEngine = new CollisionEngine()) {
        this.position = position
        this.velocity = velocity
        this.playerImage = new Image()
        this.playerImage.src = imageSrc

        this.playerImageCropX = 32 * 18
        this.playerImageCropY = 64

        this.frame = 0

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
            this.incrementFrame()
        }
        else if (isKeyDown.down) {
            this.setPlayerPosition(this.position.x, this.position.y + this.velocity)
            this.playerImageCropX = (32 * 18) + this.getSpriteNumber() * 32
            this.playerImageCropY =  (32 * 4)
            this.incrementFrame()
        }
        else if (isKeyDown.right) {
            this.setPlayerPosition(this.position.x + this.velocity, this.position.y)
            this.playerImageCropX = 0 + this.getSpriteNumber() * 32
            this.playerImageCropY =  (32 * 4)
            this.incrementFrame()
        }
        else if (isKeyDown.left) {
            this.setPlayerPosition(this.position.x - this.velocity, this.position.y)
            this.playerImageCropX = (12*32) + this.getSpriteNumber() * 32
            this.playerImageCropY =  (32 * 4)
            this.incrementFrame()
        }
        else {
            this.playerImageCropX = this.playerImageCropX + this.getSpriteNumber() * 32
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