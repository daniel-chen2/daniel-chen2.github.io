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
    right: false
}

class Sprite {
    constructor({ position, velocity, image}) {
        this.position = position
        this.velocity = velocity
        this.image = image

        this.playerImageCropX = 0
        this.playerImageCropY = 0
    }

    hasCollided(x, y) {
        return (
            y < (this.image.height-400)*-0.5 || // up boundary
            y > this.image.height*0.5 ||
            x < (this.image.width - 200)*-0.5 ||
            x > (this.image.width + 100)*0.5
        )
    }

    setPlayerPosition(x, y) {
        console.log(this.position)
        if(!this.hasCollided(x,y)) {
            background.position.y = y
            background.position.x = x
        }
    }

    movePlayer() {
        if(isKeyDown.up) {
            this.setPlayerPosition(background.position.x, background.position.y - this.velocity)
        }
        else if(isKeyDown.down) {
            this.setPlayerPosition(background.position.x, background.position.y + this.velocity)
        }
        else if(isKeyDown.right) {
            this.setPlayerPosition(background.position.x + this.velocity, background.position.y)
        }
        else if(isKeyDown.left) {
            this.setPlayerPosition(background.position.x - this.velocity, background.position.y)
        }
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

    movePlayerAndDrawBackground() {
        this.movePlayer()
        context.clearRect(0,0,canvas.width, canvas.height);
        context.createPattern(this.image,"no-repeat")
        context.drawImage(this.image, this.position.x*-1, this.position.y*-1)
    }
}

const background = new Sprite({
    position: {
        x: 150,
        y: 100
    },
    velocity: 2,
    image: mapImage
})

function animate() { 
    window.requestAnimationFrame(animate);
    background.movePlayerAndDrawBackground()
}
animate()

document.onkeydown = function (e) {
    switch (e.key) {
        case 'ArrowUp':
            console.log("up")
            isKeyDown.up = true
            break;
        case 'ArrowDown':
            console.log("up")
            isKeyDown.down = true
            break;
        case 'ArrowLeft':
            console.log("up")
            isKeyDown.left = true
            break;
        case 'ArrowRight':
            console.log("up")
            isKeyDown.right = true
    }
};

document.onkeyup = function (e) {
    switch (e.key) {
        case 'ArrowUp':
            console.log("up")
            isKeyDown.up = false
            break;
        case 'ArrowDown':
            console.log("up")
            isKeyDown.down = false
            break;
        case 'ArrowLeft':
            console.log("up")
            isKeyDown.left = false
            break;
        case 'ArrowRight':
            console.log("up")
            isKeyDown.right = false
    }
};
