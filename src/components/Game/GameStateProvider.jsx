import { useState, useRef, useEffect } from 'react'
import useGameCanvas from '/src/hooks/useGameCanvas'
import useGameTime from '/src/hooks/useGameTime'
import useEntities from '/src/hooks/useEntities'
import GameStateContext from '/src/context/GameStateContext'

export const GameStateProvider =  ({ children }) => {
  const { canvas, canvasContext, canvasRef } = useGameCanvas()
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
    <GameStateContext.Provider value={{
      canvas, canvasContext, canvasRef,
      gameTime, incrementGameTime,
      entities, addEntity, addVoid, addBall, addDVDBounceDemo, removeEntity, removeEntityById,
      resetGameMemory, initializeGame,
    }}>
      {children}
    </GameStateContext.Provider>
  )
}

export default GameStateProvider