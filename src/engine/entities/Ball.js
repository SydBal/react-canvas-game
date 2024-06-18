import PhysicsEntity from './PhysicsEntity'

class Ball extends PhysicsEntity {
  constructor(props = {}) {
    super(props)
    this.radius = props.radius || 10
    this.color = props.color || 'white'
    this.opacity = props.opacity || 1
    this.textColor = 'black'
    if (props.imageSrc) {
      this.image = new Image("auto","auto")
      this.image.src = props.imageSrc
    }
    this.imageSize = this.radius * 2
  }

  draw() {
    const {color, x, y, radius, opacity, image, imageSize, canvasContext} = this
    canvasContext.save()
    canvasContext.fillStyle = color
    canvasContext.globalAlpha = opacity
    canvasContext.beginPath()
    canvasContext.arc(
      x,
      y,
      radius,
      0,
      Math.PI * 2)
    canvasContext.fill()
    canvasContext.restore()
    // draw image stretched over center of circle
    image && canvasContext.drawImage(
      image,
      0,0,
      image.width, image.height,
      x - radius, y - radius,
      imageSize, imageSize)
    super.draw()
  }
}

export default Ball