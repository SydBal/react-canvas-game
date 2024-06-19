import Entity from "./Entity";
import { darkestRed, darkestBlue } from "/src/engine/colors";

class Void extends Entity {
  draw() {
    const { canvasContext } = this
    const { canvas } = canvasContext
    canvasContext.save()
    const gradient = canvasContext.createLinearGradient(0,0, canvas.width, canvas.height);
    gradient.addColorStop(0, darkestRed);
    gradient.addColorStop(1, darkestBlue);
    canvasContext.fillStyle = gradient;
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    canvasContext.restore()
  }
}

export default Void