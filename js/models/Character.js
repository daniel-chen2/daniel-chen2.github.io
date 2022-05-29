import { isKeyDown } from '../KeyPress.js';
import { CollisionEngine } from '../Game.js';

export class Character {
    constructor(position, velocity, imageSrc, collisionEngine = new CollisionEngine()) {
        this.position = position
        this.velocity = velocity
        this.playerImage = new Image()
        this.playerImage.src = imageSrc

        this.playerImageCropX = 0
        this.playerImageCropY = 0

        // Helpers
        this.collisionEngine = collisionEngine
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

    movePlayerAndSetCollidedObject() {
        if (isKeyDown.up) {
            this.setPlayerPosition(this.position.x, this.position.y - this.velocity)
            this.playerImageCropX = 32
            this.playerImageCropY = 0
        }
        else if (isKeyDown.down) {
            this.setPlayerPosition(this.position.x, this.position.y + this.velocity)
            this.playerImageCropX = 96
            this.playerImageCropY = 0
        }
        else if (isKeyDown.right) {
            this.setPlayerPosition(this.position.x + this.velocity, this.position.y)
            this.playerImageCropX = 0
            this.playerImageCropY = 0
        }
        else if (isKeyDown.left) {
            this.setPlayerPosition(this.position.x - this.velocity, this.position.y)
            this.playerImageCropX = 64
            this.playerImageCropY = 0
        }
        
    }

    openHrefOfNearObject() {
        let collidedObj = this.collisionEngine.getCollidedObject()
        if (collidedObj != null && isKeyDown.enter) {
            window.open(collidedObj.href, '_blank');
        }
    }
}