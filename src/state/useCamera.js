import { useEffect } from 'react'
import createStore from './createStore';
import useFullCanvas from '/src/state/useFullCanvas';

const initialCameraCenter = { x: 0, y: 0 }
const initialCameraCenterTarget = { x: 0, y: 0 }
const initialZoomScale = 1
const initialCameraEntityToFollow = undefined
const initialDebugCameraControlsEnabled = true
const initialDebugCameraControls = {
  up: false,
  down: false,
  left: false,
  right: false,
}

const [getCameraCenter, setCameraCenter] = createStore(initialCameraCenter)
const [getCameraCenterTarget, setCameraCenterTarget] = createStore(initialCameraCenterTarget)
const [getCameraZoomScale, setCameraZoomScale] = createStore(initialZoomScale)
const [getCameraEntityToFollow, setCameraEntityToFollow] = createStore(initialCameraEntityToFollow)
const [getDebugCameraControlsEnabled, setDebugCameraControlsEnabled] = createStore(initialDebugCameraControlsEnabled)
const [getDebugCameraControls, setDebugCameraControls] = createStore(initialDebugCameraControls)

const keys = {
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
}

export const useCamera = () => {
  const cameraCenter = getCameraCenter()
  const cameraCenterTarget = getCameraCenterTarget()
  const cameraZoomScale = getCameraZoomScale()
  const cameraEntityToFollow = getCameraEntityToFollow()
  const debugCameraControlsEnabled = getDebugCameraControlsEnabled()
  const debugCameraControls = getDebugCameraControls()
  const { canvasContext } = useFullCanvas()

  const resetCamera = () => {
    setCameraCenter(initialCameraCenter)
    setCameraCenterTarget(initialCameraCenterTarget)
    setCameraZoomScale(initialZoomScale)
    setCameraEntityToFollow(initialCameraEntityToFollow)
    setDebugCameraControlsEnabled(initialDebugCameraControlsEnabled)
    setDebugCameraControls(initialDebugCameraControls)
  }

  const updateCamera = () => {
    const { up, down, left, right } = debugCameraControls
    if (up) {
      setCameraCenterTarget(previousTarget => ({
        ...previousTarget,
        y: previousTarget.y + 5
      }))
    }
    if (down) {
      setCameraCenterTarget(previousTarget => ({
        ...previousTarget,
        y: previousTarget.y - 5
      }))
    }
    if (left) {
      setCameraCenterTarget(previousTarget => ({
        ...previousTarget,
        x: previousTarget.x - 5
      }))
    }
    if (right) {
      setCameraCenterTarget(previousTarget => ({
        ...previousTarget,
        x: previousTarget.x + 5
      }))
    }
  }

  const handleDebugCameraControls = {
    handleKeyDown: (event) => {
      for (const key in keys) {
        if (keys[key] === event.key && event.shiftKey) {
          setDebugCameraControls(previousCameraControls => ({
            ...previousCameraControls,
            [key]: true,
          }))
        }
      }
    },
    handleKeyUp: (event) => {
      for (const key in keys) {
        if (keys[key] === event.key) {
          setDebugCameraControls(previousCameraControls => ({
            ...previousCameraControls,
            [key]: false,
          }))
        }
      }
    },
  }

  useEffect(() => {
    const { handleKeyDown, handleKeyUp } = handleDebugCameraControls
    if (debugCameraControlsEnabled) {
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('keyup', handleKeyUp)
    } else {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
      setDebugCameraControls(initialDebugCameraControls)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    };
  }, [debugCameraControlsEnabled])

  useEffect(() => {
    const { x, y } = cameraCenterTarget
    const { x: x0, y: y0 } = cameraCenter
    canvasContext?.translate(x0 - x, y0 - y)
    setCameraCenter({ x , y })
  }, [cameraCenterTarget])

  return {
    cameraCenter, setCameraCenter,
    cameraCenterTarget, setCameraCenterTarget,
    cameraZoomScale, setCameraZoomScale,
    cameraEntityToFollow, setCameraEntityToFollow,
    debugCameraControlsEnabled, setDebugCameraControlsEnabled,
    debugCameraControls,
    updateCamera, resetCamera
  }
}

export default useCamera