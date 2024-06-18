import { useState } from 'react'

const initialGameTime = 0

export const useGameTime = () => {
  const [gameTime, setGameTime] = useState(0)

  const incrementGameTime = () => setGameTime(previousGameTime => previousGameTime + 1)

  const resetGameTime = () => setGameTime(initialGameTime)

  return { gameTime, incrementGameTime, resetGameTime }
}

export default useGameTime