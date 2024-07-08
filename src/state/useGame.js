import { useEffect, useRef } from 'react'
import createStore from './createStore'
import useFullCanvas from './useFullCanvas'
import useGameTime from './useGameTime'
import useEntities from './useEntities'
import useCamera from './useCamera'

const initialIsGameInitialized = false
const {
  useStore: useIsGameInitialized,
  setStore: setIsGameInitialized
} = createStore(initialIsGameInitialized);

const useGame = () => {
  const { canvas, canvasContext } = useFullCanvas()
  const { gameTime, incrementGameTime, resetGameTime } = useGameTime()
  const {
    entities,
    addVoid, addGameOriginX, addDVDBounceDemo, addBall,
    resetEntities,
  } = useEntities()
  const { cameraCenter, setCameraEntityToFollow, updateCamera, resetCamera } = useCamera()
  const isGameInitialized = useIsGameInitialized()
  const animationRef = useRef()

  const resetGameMemory = () => {
    cancelAnimationFrame(animationRef.current)
    resetGameTime()
    resetEntities()
    resetCamera()
    setIsGameInitialized(initialIsGameInitialized)
  }

  const update = () => {
    Object.values(entities).forEach((entity) => entity.update?.())
    updateCamera()
    incrementGameTime()
  }

  const draw = () => {
    canvasContext.clearRect(0,0, canvas.width, canvas.height)
    Object.values(entities).forEach((entity) => entity.draw?.())
  }
  
  const play = () => {
    update()
    draw()
  }

  const initializeGame = () => {
    resetGameMemory()

    addVoid()
    addGameOriginX()

    // addBall({ x: 0, y: 0, radius: 100000 })
    const dvd = addDVDBounceDemo()
    // setCameraEntityToFollow(dvd)
    addBall()
    // setCameraCenterTarget({x:canvas.width/2, y:-canvas.height/2})
    setIsGameInitialized(true)
    play()
  }

  // Play loop based on game time incrementing
  useEffect(() => {
    if (isGameInitialized) {
      animationRef.current = requestAnimationFrame(play)
    }
  }, [gameTime])

  // CanvasDidMount
  useEffect(() => {
    if (canvasContext) {
      initializeGame()
    }
  }, [canvasContext])
  
  useEffect(() => {
    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return { initializeGame }
}

export default useGame

