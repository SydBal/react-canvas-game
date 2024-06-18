import { useState, useEffect, useRef } from 'react'

export const useFullCanvas = () => {
  const [currentCanvas, setCurrentCanvas] = useState()
  const canvasRef = useRef()

  const resetCanvas = () => {
    setCurrentCanvas()
    canvasRef.current.value = undefined
  }

  useEffect(() => {
    const canvas = canvasRef.current

    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error('useCanvas canvasRef not set to canvas element')
    }

    canvas.style.display = "block"
    canvas.style.position = "absolute"
    canvas.style.width = "100%"
    canvas.style.height = "100%"

    const fitCanvasToParent = () => {
      canvas.height =  canvas.parentNode.clientHeight
      canvas.width = canvas.parentNode.clientWidth
    }
    fitCanvasToParent()

    const observer = new ResizeObserver(fitCanvasToParent);
    observer.observe(canvas);

    setCurrentCanvas(canvas)
  
    return () => {
      observer.disconnect()
    }
  },  [canvasRef]);

  return {
    canvas: currentCanvas,
    canvasContext: currentCanvas?.getContext('2d'),
    canvasRef,
    resetCanvas,
  }
}

export default useFullCanvas