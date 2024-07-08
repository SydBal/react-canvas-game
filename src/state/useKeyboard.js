import { useEffect } from "react"
import createStore from "./createStore"

const initialKeyboard = {}
const {
  useStore,
  setStore,
  resetStore,
} = createStore(initialKeyboard)

export const useKeyboard = () => {
  const keyboard = useStore()

  const handleKeyDown = (event) => {
    setStore(previousKeys => ({
      ...previousKeys,
      [event.key]: event
    }))
  }

  const handleKeyUp = event => {
    setStore(previousKeys => {
      // eslint-disable-next-line no-unused-vars
      const { [event.key]: removed, ...otherPreviousKeys } = previousKeys
      return { ...otherPreviousKeys }
    })
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  })

  return {
    keyboard,
    resetKeyBoardState: resetStore
  }
}

export default useKeyboard
