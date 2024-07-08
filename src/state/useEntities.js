import createStore from './createStore';
import useFullCanvas from '/src/state/useFullCanvas';
import Entity from '/src/engine/entities/Entity';
import Void from '/src/engine/entities/Void';
import GameOriginX from '/src/engine/entities/GameOriginX';
import Ball from '/src/engine/entities/Ball';
import DVDBounceDemo from '/src/engine/entities/DVDBounceDemo';

const initialEntities = { nextEntityId: 0 }
const { useStore, setStore, resetStore } = createStore(initialEntities)

export const useEntities = () => {
  const entities = useStore()
  const { canvasContext } = useFullCanvas()

  const addEntity = ({ props, EntityClass = Entity }) => {
    let newEntity
    setStore(previousEntities => {
      const { nextEntityId } = previousEntities

      newEntity = new EntityClass({
        id: nextEntityId, canvasContext, ...props
      })

      return {
        ...previousEntities,
        [nextEntityId]: newEntity,
        nextEntityId: nextEntityId + 1
      }
    })
    return newEntity
  }

  const addVoid = (props) => addEntity({ EntityClass: Void, props })

  const addGameOriginX = (props) => addEntity({ EntityClass: GameOriginX, props })

  const addBall = (props) => addEntity({ EntityClass: Ball, props })

  const addDVDBounceDemo = (props) => addEntity({ EntityClass: DVDBounceDemo, props })

  const removeEntity = (entityToRemove) => {
    // eslint-disable-next-line no-unused-vars
    const { [entityToRemove.id]: removed, ...otherEntities } = entities
    setStore({ ...otherEntities })
  }
  
  const removeEntityById = (id) => {
    setStore(previousEntities => {
      // eslint-disable-next-line no-unused-vars
      const { [id]: removed, ...otherPreviousEntities } = previousEntities
      return { ...otherPreviousEntities }
    })
  }

  return {
    entities,
    addEntity, addVoid, addGameOriginX, addBall, addDVDBounceDemo,
    removeEntity, removeEntityById,
    resetEntities: resetStore,
  }
}

export default useEntities