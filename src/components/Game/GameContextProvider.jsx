import { useState, useEffect, useRef } from 'react'
import useFullCanvasContext from '/src/components/FullCanvas/hooks/useFullCanvasContext'
import useGameTime from './hooks/useGameTime'
import useEntities from './hooks/useEntities'
import { GameContext } from './hooks/useGameContext'
import useCamera from './hooks/useCamera'

export const GameContextProvider =  ({ children }) => {
  const { canvas, canvasContext, canvasRef } = useFullCanvasContext()
  const { gameTime, incrementGameTime, resetGameTime } = useGameTime()
  const { entities, addEntity, addVoid, addBall, addDVDBounceDemo, removeEntity, removeEntityById, resetEntities } = useEntities()
  const {
    cameraCenter, setCameraCenter,
    cameraCenterTarget, setCameraCenterTarget,
    cameraZoomScale, setCameraZoomScale,
    cameraEntityToFollow, setCameraEntityToFollow,
    debugCameraControlsEnabled, setDebugCameraControlsEnabled,
    debugCameraControls, updateCamera, resetCamera,
  } = useCamera()
  const [isGameInitialized, setIsGameInitialized] = useState(false)
  const animationRef = useRef()

  const resetGameMemory = () => {
    resetGameTime()
    resetEntities()
    resetCamera()
    setIsGameInitialized(false)
  }

  const update = () => {
    Object.values(entities).forEach((entity) => entity.update?.())
    updateCamera()
    animationRef.current = requestAnimationFrame(incrementGameTime)
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
    addDVDBounceDemo()
    addBall()

    setIsGameInitialized(true)
    play()
  }

  // Play loop based on game time incrementing
  useEffect(() => {
    if (isGameInitialized) {
      play()
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

  return (
    <GameContext.Provider value={{
      canvas, canvasContext, canvasRef,
      gameTime, incrementGameTime,
      entities, addEntity, addVoid, addBall, addDVDBounceDemo, removeEntity, removeEntityById,
      isGameInitialized, setIsGameInitialized,
      animationRef,
      resetGameMemory,
      cameraCenter, setCameraCenter,
      cameraCenterTarget, setCameraCenterTarget,
      cameraZoomScale, setCameraZoomScale,
      cameraEntityToFollow, setCameraEntityToFollow,
      debugCameraControlsEnabled, setDebugCameraControlsEnabled,
      debugCameraControls, updateCamera, resetCamera,
    }}>
      {children}
    </GameContext.Provider>
  )
}

export default GameContextProvider