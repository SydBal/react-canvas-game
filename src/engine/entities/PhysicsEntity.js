import Entity from "./Entity"

class PhysicsEntity extends Entity {
  constructor(props = {}) {
    super(props)
    const {
      canvasContext,
      x, y, speedX, speedY,
      text, textColor, textScale
    } = props
    this.x = x !== undefined ? x : canvasContext.canvas.width / 2
    this.y = y !== undefined ? y : canvasContext.canvas.height / 2
    this.speedX = speedX || 0
    this.speedY = speedY || 0
    this.text = text
    this.textColor = textColor || 'black'
    this.textScale = textScale || 1
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY
  }

  draw() {
    const {
      canvasContext,
      x, y,
      text, textColor, textScale,
    } = this

    if (text) {
      canvasContext.save()
      canvasContext.fillStyle = textColor;
      canvasContext.font = textScale * 16
      canvasContext.textAlign = 'center'
      canvasContext.textBaseline = 'middle'
      canvasContext.fillText(text, x, y)
      canvasContext.restore()
    }
  }
}

export default PhysicsEntity