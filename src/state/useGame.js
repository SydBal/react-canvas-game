import { useEffect, useRef } from 'react'
import createStore from './createStore'
import useFullCanvas from './useFullCanvas'
import useGameTime from './useGameTime'
import useEntities from './useEntities'
import useCamera from './useCamera'

const initialIsGameInitialized = false
const [getIsGameInitialized, setIsGameInitialized] = createStore(initialIsGameInitialized);

const useGame = () => {
  const { canvas, canvasContext } = useFullCanvas()
  const { gameTime, incrementGameTime, resetGameTime } = useGameTime()
  const {
    entities,
    addVoid, addDVDBounceDemo, addBall,
    resetEntities,
  } = useEntities()
  const { updateCamera, setCameraEntityToFollow, resetCamera } = useCamera()
  const isGameInitialized = getIsGameInitialized()
  const animationRef = useRef()

  const resetGameMemory = () => {
    cancelAnimationFrame(animationRef.current)
    resetGameTime()
    resetEntities()
    resetCamera()
    setIsGameInitialized(false)
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
    const dvd = addDVDBounceDemo()
    setCameraEntityToFollow(dvd)
    addBall()
  
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

