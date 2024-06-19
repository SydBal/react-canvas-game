import createStore from "./createStore"

const initialGameTime = 0
const [getGameTime, setGameTime] = createStore(initialGameTime)

export const useGameTime = () => {
  const gameTime = getGameTime()

  const incrementGameTime = () => setGameTime(previousGameTime => previousGameTime + 1)

  const resetGameTime = () => setGameTime(initialGameTime)

  return { gameTime, incrementGameTime, resetGameTime }
}

export default useGameTime