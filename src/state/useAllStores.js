import useCamera from "./useCamera"
import useEntities from "./useEntities"
import useFullCanvas from "./useFullCanvas"
import useGame from "./useGame"
import useGameTime from "./useGameTime"

export const useAllStores = () => {
  return {
    ...useCamera(),
    ...useEntities(),
    ...useFullCanvas(),
    ...useGame(),
    ...useGameTime()
  }
}

export default useAllStores
