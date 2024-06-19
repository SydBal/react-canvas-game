import createStore from './createStore';
import useFullCanvas from '/src/state/useFullCanvas';
import Void from '/src/engine/entities/Void';
import Ball from '/src/engine/entities/Ball';
import DVDBounceDemo from '/src/engine/entities/DVDBounceDemo';

const initialEntities = { nextEntityId: 0 }
const [getEntities, setEntities] = createStore(initialEntities)

export const useEntities = () => {
  const entities = getEntities()
  const { canvasContext } = useFullCanvas()

  const addEntity = ({ props, EntityClass  }) => {
    let newEntity
    setEntities(previousEntities => {
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

  const addBall = (props) => addEntity({ EntityClass: Ball, props })

  const addDVDBounceDemo = (props) => addEntity({ EntityClass: DVDBounceDemo, props })

  const removeEntity = (entityToRemove) => {
    // eslint-disable-next-line no-unused-vars
    const { [entityToRemove.id]: removed, ...otherEntities } = entities
    setEntities({ ...otherEntities })
  }
  
  const removeEntityById = (id) => {
    // eslint-disable-next-line no-unused-vars
    const { [id]: removed, ...otherEntities } = entities
    setEntities({ ...otherEntities })
  }

  const resetEntities = () => {
    setEntities(initialEntities)
  }

  return {
    entities,
    addEntity, addVoid, addBall, addDVDBounceDemo,
    removeEntity, removeEntityById, resetEntities
  }
}

export default useEntities