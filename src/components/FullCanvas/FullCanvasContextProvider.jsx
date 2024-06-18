import useFullCanvas from './hooks/useFullCanvas'
import { FullCanvasContext } from './hooks/useFullCanvasContext'

export const FullCanvasContextProvider =  ({ children }) => {
  const { canvas, canvasContext, canvasRef } = useFullCanvas()

  return (
    <FullCanvasContext.Provider value={{ canvas, canvasContext, canvasRef }}>
      {children}
    </FullCanvasContext.Provider>
  )
}

export default FullCanvasContextProvider