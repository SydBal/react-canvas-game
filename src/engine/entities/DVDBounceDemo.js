import Ball from './Ball'
import { getRandomColor } from '/src/engine/colors'
import reactSvg from '/src/assets/react.svg?url'
import viteSvg from '/src/assets/vite.svg?url'
import { randomIntRange } from '/src/engine/math'

class DVDBounceDemo extends Ball {
  constructor(props) {
    super({
      radius: 50,
      ...props,
    })
    this.reactImage = new Image()
    this.reactImage.src = reactSvg
    this.viteImage = new Image()
    this.viteImage.src = viteSvg
    this.image = this.viteImage
    this.color = getRandomColor()
    this.opacity = 0
    this.x = randomIntRange(
      0 + this.radius,
      this.canvasContext.canvas.width - this.radius,
    )
    this.y =  randomIntRange(
      0 + this.radius,
      this.canvasContext.canvas.height - this.radius,
    )
    this.speedX = randomIntRange(3, 5);
    this.speedY = randomIntRange(3, 5);
  }

  swapImage() {
    if (this.image.src === this.reactImage.src) {
      this.image = this.viteImage
    } else {
      this.image = this.reactImage
    }
  }

  update() {
    const { radius, x, y, speedX, speedY, canvasContext } = this
    const canvas = canvasContext.canvas

    // Bounce off screen walls
    if (x + speedX > canvas.width - radius || x + speedX < radius) {
      this.speedX = -speedX;
      this.color = getRandomColor()
      this.swapImage()
    }
    if (y + speedY > canvas.height - radius || y + speedY < radius) {
      this.speedY = -speedY;
      this.color = getRandomColor()
      this.swapImage()
    }
  
    super.update()
  }
}

export default DVDBounceDemo