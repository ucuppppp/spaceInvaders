export default class Bullet {
    constructor(canvas,x,y,velocity,bulletColor) {
        this.canvas = canvas
        this.x = x
        this.y = y
        this.velocity = velocity
        this.bulletColor = bulletColor

        this.width = 5
        this.heigth = 20

    }

    draw(ctx) {
        this.y -= this.velocity
        ctx.fillStyle = this.bulletColor
        ctx.fillRect(this.x, this.y, this.width, this,this.heigth)
    }

}