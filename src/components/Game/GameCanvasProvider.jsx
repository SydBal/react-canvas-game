import useFullCanvas from '/src/hooks/useFullCanvas'
import GameCanvasContext from '/src/context/GameCanvasContext'

export const GameCanvasProvider =  ({ children }) => {
  const { canvas, canvasContext, canvasRef } = useFullCanvas()

  return (
    <GameCanvasContext.Provider value={{ canvas, canvasContext, canvasRef }}>
      {children}
    </GameCanvasContext.Provider>
  )
}

export default GameCanvasProvider