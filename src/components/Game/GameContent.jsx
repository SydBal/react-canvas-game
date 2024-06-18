import DebugMenu from '/src/components/DebugMenu';
import FullCanvas from '/src/components/FullCanvas';
import useGameContext from './hooks/useGameContext';

const GameContent = () => {
  const { canvasRef } = useGameContext()
  return (
    <div className="game-container">
      <FullCanvas ref={canvasRef} />
      <DebugMenu />
    </div>
  )
}

export default GameContent;
