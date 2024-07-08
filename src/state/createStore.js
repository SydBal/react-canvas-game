import { useSyncExternalStore, useCallback } from 'react'

const shouldUpdate = (oldState, newState) => {
  if (oldState === newState) return false
  if (
    [oldState, newState]
      .map(state => typeof state === 'object' && !Array.isArray(state) && state !== null)
      .every(validObject => validObject)
  ) {
    for (let key in newState) {
      if (oldState[key] !== newState[key]) return true
    }
    return false
  }
  return false
}

const createStore = (initialStore, reducer) => {
  let store = initialStore
  const listeners = new Set()

  const useStore = (selectorFn = store => store) => {
    const subscribe = useCallback(updater => {
      const listener = {
        updater,
        selectorFn,
      }
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    }, [])

    const syncedStore = useSyncExternalStore(
      subscribe,
      getStore,
      getServerStore
    )
    return selectorFn(syncedStore)
  }

  const setStore = action => {
    const oldStore = store

    reducer
      ? store = reducer(store, action)
      : store = action instanceof Function ? action(store) : action

    listeners.forEach(({ selectorFn, updater }) => {
      const oldState = selectorFn(oldStore)
      const newState = selectorFn(store)
      if (shouldUpdate(oldState, newState)) updater(() => newState)
    })
  }

  const getStore = () => store

  const getServerStore = () => initialStore

  const resetStore = () => store = initialStore

  return {
    useStore,
    setStore,
    getStore,
    resetStore
  }
}

export default createStore
