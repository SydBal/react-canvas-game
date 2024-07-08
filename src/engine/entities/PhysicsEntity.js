import Entity from "./Entity"

class PhysicsEntity extends Entity {
  constructor(props = {}) {
    super(props)
    const {
      canvasContext,
      x, y, speedX, speedY,
    } = props
    this.x = x !== undefined ? x : canvasContext.canvas.width / 2
    this.y = y !== undefined ? y : canvasContext.canvas.height / 2
    this.speedX = speedX || 0
    this.speedY = speedY || 0
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY
  }
}

export default PhysicsEntity