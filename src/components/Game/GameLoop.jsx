import { useEffect, useRef } from "react"
import useGameContext from "./hooks/useGameContext"

const GameLoop = ({ children }) => {
  const {
    canvas, canvasContext,
    entities, addVoid, addBall, addDVDBounceDemo,
    gameTime, incrementGameTime,
    isGameInitialized, setIsGameInitialized,
    updateCamera,
    resetGameMemory,
    
  } = useGameContext()
  const animationRef = useRef()

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

  return children
}

export default GameLoop