import FullCanvasContextProvider from '/src/components/FullCanvas/FullCanvasContextProvider'
import GameContextProvider from './GameContextProvider'
import GameContent from './GameContent'
import './index.css'

const Game = () =>
  <FullCanvasContextProvider>
    <GameContextProvider>
      <GameContent/>
    </GameContextProvider>
  </FullCanvasContextProvider>

export default Game
