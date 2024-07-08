import createStore from "./createStore"

const initialGameTime = 0
const { useStore, setStore, resetStore } = createStore(initialGameTime)

export const useGameTime = () => {
  const gameTime = useStore()

  const incrementGameTime = () => setStore(previousGameTime => previousGameTime + 1)

  return { gameTime, incrementGameTime, resetGameTime: resetStore }
}

export default useGameTime