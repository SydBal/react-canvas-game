// https://stackoverflow.com/a/70544793
import { useSyncExternalStore } from 'react'

export const createStore = (initialStore) => {
  let store = initialStore
  const listeners = new Set()

  const getStore = () => store

  const dispatch = (newStore) => {
    store = typeof newStore === 'function' ? newStore(store) : newStore
    listeners.forEach(listener => listener(() => store))
  }

  const subscribe = (listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  const useStore = () => {
    return useSyncExternalStore(subscribe, getStore)
  }

  return [useStore, dispatch]
}

export default createStore
