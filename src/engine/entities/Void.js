import PhysicsEntity from'./PhysicsEntity';
import { darkestRed, darkestBlue } from '/src/engine/colors';

/**
 * Void is the furthest background of the game.
 * It is the first entity added to the game, and follows the transformed canvas.
 * Prevents having to clear the canvas every frame.
 */
class Void extends PhysicsEntity {
  draw() {
    const { canvasContext } = this
    const { canvas } = canvasContext
    canvasContext.save()
    canvasContext.setTransform(1, 0, 0, 1, 0, 0);
    const gradient = canvasContext.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, darkestBlue);
    gradient.addColorStop(1, darkestRed);
    canvasContext.fillStyle = gradient;
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    canvasContext.restore();
  }
}

export default Void