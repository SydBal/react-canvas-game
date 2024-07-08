import createStore from "./createStore"

const initialGameTime = 0
const {
  useStore: useGameTimeStore,
  setStore: setGameTime,
} = createStore(initialGameTime)

export const useGameTime = () => {
  const gameTime = useGameTimeStore()

  const incrementGameTime = () => setGameTime(previousGameTime => previousGameTime + 1)

  const resetGameTime = () => setGameTime(initialGameTime)

  return { gameTime, incrementGameTime, resetGameTime }
}

export default useGameTime