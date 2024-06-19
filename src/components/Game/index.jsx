import DebugMenu from '/src/components/DebugMenu';
import useFullCanvas from '/src/state/useFullCanvas';
import './index.css'

const Game = () => {
  const { canvasRef } = useFullCanvas()
  return (
    <div className="game-container">
      <canvas ref={canvasRef} />
      <DebugMenu />
    </div>
  )
}

export default Game;
