import GameCanvasProvider from "./GameCanvasProvider";
import GameStateProvider from "./GameStateProvider";
import GameContent from "./GameContent";
import "./index.css"

const Game = () => (
  <GameCanvasProvider>
    <GameStateProvider>
      <GameContent/>
    </GameStateProvider>
  </GameCanvasProvider>
)

export default Game
