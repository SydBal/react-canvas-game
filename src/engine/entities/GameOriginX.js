import Entity from "./Entity";

class GameOriginX extends Entity {
  constructor(props) {
    super(props)
    this.x = 0
    this.y = 0
  }
  draw() {
    const { canvasContext } = this
    canvasContext.save()
    canvasContext.beginPath();
    canvasContext.moveTo(0, 0);
    canvasContext.lineTo(100, 100);
    canvasContext.lineWidth = 10;
    canvasContext.strokeStyle = "red";
    canvasContext.stroke();
    canvasContext.moveTo(0, 0);
    canvasContext.lineTo(100, -100);
    canvasContext.lineWidth = 10;
    canvasContext.strokeStyle = "red";
    canvasContext.stroke();
    canvasContext.moveTo(0, 0);
    canvasContext.lineTo(-100, -100);
    canvasContext.lineWidth = 10;
    canvasContext.strokeStyle = "red";
    canvasContext.stroke();
    canvasContext.moveTo(0, 0);
    canvasContext.lineTo(-100, 100);
    canvasContext.lineWidth = 10;
    canvasContext.strokeStyle = "red";
    canvasContext.stroke();
    canvasContext.restore()
  }
}

export default GameOriginX