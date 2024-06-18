import { useContext } from 'react'
import GameStateContext from '/src/context/GameStateContext'

export const useGameState = () => useContext(GameStateContext)

export default useGameState
