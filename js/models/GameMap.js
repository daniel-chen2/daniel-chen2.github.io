// Models
// Draws Game Map and holds its physical properties
export class GameMap {
    constructor(mapWidth, mapHeight, backgroundImageSrc, boundaries) {
        this.mapHeight = mapHeight;
        this.mapWidth = mapWidth;
        this.backgroundImage = new Image()
        this.backgroundImage.src = backgroundImageSrc
        this.boundaries = boundaries;
    }

    draw(context, posX, posY) {
        context.drawImage(this.backgroundImage, posX * -1, posY * -1)
    }
}