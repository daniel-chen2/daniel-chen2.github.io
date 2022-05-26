const canvas = document.getElementById("pokemonCanvas");
const context = canvas.getContext("2d");

canvas.width = 1024
canvas.height = 576

const mapImage = new Image()
mapImage.src = "imgs/mapBackground.png"

const playerImage = new Image()
playerImage.src = 'imgs/characterSheet.png'

var isKeyDown = {
    up: false,
    down: false,
    left: false,
    right: false,
    enter: false
}

class Sprite {
    constructor({ position, velocity, image }) {
        this.position = position
        this.velocity = velocity
        this.image = image

        this.playerImageCropX = 0
        this.playerImageCropY = 0

        this.nearObject = null

        this.mapObjects = [
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
    }

    collidedIntoObject(x, y) {
        return (
            this.mapObjects.some(function (obj) {
                return y > obj.topSide && // up boundary
                    y < obj.bottomSide &&
                    x > obj.leftSide &&
                    x < obj.rightSide
            })
        )
    }

    hasCollided(x, y) {
        console.log(this.collidedIntoObject(x, y))
        return (
            y < (this.image.height - 400) * -0.5 || // up boundary
            y > this.image.height * 0.5 ||
            x < (this.image.width - 200) * -0.5 ||
            x > (this.image.width + 100) * 0.5 ||
            this.collidedIntoObject(x, y)
        )
    }

    setNearObject() {
        this.nearObject = this.mapObjects.find(function (obj) {
            return background.position.y > obj.topSide - 10 && // up boundary
                background.position.y < obj.bottomSide + 10 &&
                background.position.x > obj.leftSide - 10 &&
                background.position.x < obj.rightSide + 10
        })
    }

    openHrefOfNearObject() {
        if (this.nearObject.href !== null) {
            window.open(this.nearObject.href,'_blank');
        }
    }

    setPlayerPosition(x, y) {
        console.log(this.position)
        if (!this.hasCollided(x, y)) {
            background.position.y = y
            background.position.x = x
        }
    }

    movePlayer() {
        if (isKeyDown.up) {
            this.setPlayerPosition(background.position.x, background.position.y - this.velocity)
            this.playerImageCropX = 32
            this.playerImageCropY = 0
        }
        else if (isKeyDown.down) {
            this.setPlayerPosition(background.position.x, background.position.y + this.velocity)
            this.playerImageCropX = 96
            this.playerImageCropY = 0
        }
        else if (isKeyDown.right) {
            this.setPlayerPosition(background.position.x + this.velocity, background.position.y)
            this.playerImageCropX = 0
            this.playerImageCropY = 0
        }
        else if (isKeyDown.left) {
            this.setPlayerPosition(background.position.x - this.velocity, background.position.y)
            this.playerImageCropX = 64
            this.playerImageCropY = 0
        }
        this.setNearObject()
    }

    drawPlayer(dx, dy) {
        context.drawImage(
            playerImage,
            dx,
            dy,
            32,
            64,
            (canvas.width / 2) - 16,
            canvas.height / 2 - 32,
            64,
            128
        )
    }

    drawMapObjects(imageUrl, dx, dy) {
        const image = new Image()
        image.src = imageUrl
        context.drawImage(image, dx, dy)
    }

    movePlayerAndDrawBackground() {
        this.movePlayer()
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.createPattern(this.image, "no-repeat")

        context.drawImage(this.image, this.position.x * -1, this.position.y * -1)
        this.drawPlayer(this.playerImageCropX, this.playerImageCropY)
    }
}

const background = new Sprite({
    position: {
        x: 150,
        y: 100
    },
    velocity: 3,
    image: mapImage
})

function animate() {
    window.requestAnimationFrame(animate);
    background.movePlayerAndDrawBackground()
}
animate()

document.onkeydown = function (e) {
    switch (e.key) {
        case 'Enter':
            isKeyDown.enter = true
            background.openHrefOfNearObject()
            break;
        case 'ArrowUp':
            isKeyDown.up = true
            break;
        case 'ArrowDown':
            isKeyDown.down = true
            break;
        case 'ArrowLeft':
            isKeyDown.left = true
            break;
        case 'ArrowRight':
            isKeyDown.right = true
    }
};

document.onkeyup = function (e) {
    switch (e.key) {
        case 'Enter':
            isKeyDown.enter = false
            break;
        case 'ArrowUp':
            isKeyDown.up = false
            break;
        case 'ArrowDown':
            isKeyDown.down = false
            break;
        case 'ArrowLeft':
            isKeyDown.left = false
            break;
        case 'ArrowRight':
            isKeyDown.right = false
    }
};
