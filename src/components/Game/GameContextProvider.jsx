import { useState, useRef, useEffect } from 'react'
import useFullCanvasContext from '/src/components/FullCanvas/hooks/useFullCanvasContext'
import useGameTime from './hooks/useGameTime'
import useEntities from './hooks/useEntities'
import { GameContext } from './hooks/useGameContext'

export const GameContextProvider =  ({ children }) => {
  const { canvas, canvasContext, canvasRef } = useFullCanvasContext()
  const { gameTime, incrementGameTime, resetGameTime } = useGameTime()
  const { entities, addEntity, addVoid, addBall, addDVDBounceDemo, removeEntity, removeEntityById, resetEntities } = useEntities()
  const [isGameInitialized, setIsGameInitialized] = useState(false);
  const animationRef = useRef()

  const resetGameMemory = () => {
    resetGameTime()
    resetEntities()
  }

  const update = () => {
    Object.values(entities).forEach((entity) => entity.update?.())
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

    setIsGameInitialized(true)
    play()
  }

  useEffect(() => {
    // CanvasDidMount
    if (canvasContext) {
      initializeGame()
    }
  }, [canvasContext])

  // Play loop
  useEffect(() => {
    if (isGameInitialized) {
      play()
    }
  }, [gameTime])

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
      resetGameMemory, initializeGame,
    }}>
      {children}
    </GameContext.Provider>
  )
}

export default GameContextProvider