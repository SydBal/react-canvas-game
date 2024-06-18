import React, { useContext } from 'react'

export const GameContext = React.createContext({})

export const useGameContext = () => useContext(GameContext)

export default useGameContext
