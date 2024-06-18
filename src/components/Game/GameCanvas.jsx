import useGameState from "/src/hooks/useGameState";

const GameCanvas = () => {
  const { canvasRef } = useGameState();

  return <canvas ref={canvasRef} />
}

export default GameCanvas
