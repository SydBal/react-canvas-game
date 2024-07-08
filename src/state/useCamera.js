import { useEffect } from 'react'
import createStore from './createStore';
import useFullCanvas from '/src/state/useFullCanvas';
import useKeyboard from '/src/state/useKeyboard';

const initialCameraState = {
  cameraCenter: {
    x: 0, y: 0,
  },
  cameraSize: 0,
  cameraZoom: {
    scale: 1,
    sensitivity: 0.1
  },
  entityToFollow: undefined,
  cameraDebugControlsEnabled: true
}

const { useStore, setStore, getStore, resetStore } = createStore(initialCameraState)

export const useCamera = () => {
  const {
    cameraCenter,
    cameraSize,
    cameraZoom,
    cameraEntityToFollow,
    cameraDebugControlsEnabled,
  } = useStore()
  const { canvas, canvasContext, canvasDimensions } = useFullCanvas()
  const { keyboard } = useKeyboard()

  const resetCamera = () => {
    setCameraCenter({ x: 0, y: 0 })
    // resetStore()
  }

  const getGameSize = () => Math.min(canvas?.width, canvas?.height)

  useEffect(() => {
    setStore(previousCamera => ({
      ...previousCamera,
      cameraSize: getGameSize()
    }))
  }, [canvasDimensions])

  const setCameraCenter = ({ x, y }) => setStore(
    previousCamera => {
      const { cameraCenter: { x: x0, y: y0 }} = previousCamera
      const dx = x0 - x
      const dy = y0 - y
      canvasContext?.translate(dx, -dy)
      return {
        ...previousCamera,
        cameraCenter: { x, y }
      }
    }
  )

  const setCameraEntityToFollow = (cameraEntityToFollow) => setStore(
    previousCamera => ({
      ...previousCamera,
      cameraEntityToFollow
    })
  )

  const calculateCameraCenter = () => {
    let newCameraCenter = { ...cameraCenter }
    if (cameraEntityToFollow && canvasDimensions) {
      const { width, height } = canvasDimensions
      const { x, y } = cameraEntityToFollow
      newCameraCenter = {
        x: x - width/2,
        y: -y + height/2
      }
    }

    if (cameraDebugControlsEnabled) {
      const { Shift, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } = keyboard
      if (Shift) {
        if (ArrowUp) {
          newCameraCenter.y = newCameraCenter.y + 5
        }
        if (ArrowDown) {
          newCameraCenter.y = newCameraCenter.y - 5
        }
        if (ArrowLeft) {
          newCameraCenter.x = newCameraCenter.x - 5
        }
        if (ArrowRight) {
          newCameraCenter.x = newCameraCenter.x + 5
        }
      }
    }
    return newCameraCenter
  }

  const updateCamera = () => {
    setCameraCenter(calculateCameraCenter())
  }

  return {
    cameraCenter, setCameraCenter,
    cameraEntityToFollow, setCameraEntityToFollow,
    cameraDebugControlsEnabled,
    updateCamera,
    resetCamera,
  }
}

export const getCamera = getStore

export default useCamera