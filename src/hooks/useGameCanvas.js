import { useContext } from 'react'
import GameCanvasContext from '/src/context/GameCanvasContext'

export const useGameCanvas = () => useContext(GameCanvasContext)

export default useGameCanvas
