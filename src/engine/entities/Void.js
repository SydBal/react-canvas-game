import PhysicsEntity from'./PhysicsEntity';
import { darkestRed, darkestBlue } from '/src/engine/colors';
import { getCamera } from '/src/state/useCamera';

/**
 * Void is the furthest background of the game.
 * It is the first entity added to the game, and follows the camera.
 */
class Void extends PhysicsEntity {
  draw() {
    const { canvasContext } = this
    const { canvas } = canvasContext
    const { cameraCenter } = getCamera();
    canvasContext.save()
    const gradient = canvasContext.createLinearGradient(0,0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'blue');
    gradient.addColorStop(1, 'red');
    canvasContext.fillStyle = gradient;
    canvasContext.fillRect(
      0 + cameraCenter.x,
      0 - cameraCenter.y,
      canvas.width,
      canvas.height
    );
    canvasContext.restore()
  }
}

export default Void