import { useEffect, useRef } from 'react'
import createStore from './createStore';

const initialCanvas = undefined
const [getCanvas, setCanvas] = createStore(initialCanvas)

export const useFullCanvas = () => {
  const currentCanvas = getCanvas()
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!(canvas instanceof HTMLCanvasElement)) {
      return
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

    setCanvas(canvas)
  
    return () => {
      observer.disconnect()
    }
  }, [canvasRef])

  

  return {
    canvas: currentCanvas,
    canvasContext: currentCanvas?.getContext('2d'),
    canvasRef,
  }
}

export default useFullCanvas
