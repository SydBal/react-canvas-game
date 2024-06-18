import DebugMenu from "/src/components/DebugMenu";
import GameCanvas from "./GameCanvas";

const GameContent = () => {
  return (
    <div className="game-container">
      <GameCanvas />
      <DebugMenu />
    </div>
  )
}

export default GameContent;
