import { useState } from 'react'
import Entity from '/src/engine/entities/Entity';
import Void from '/src/engine/entities/Void';
import Ball from '/src/engine/entities/Ball';
import DVDBounceDemo from '/src/engine/entities/DVDBounceDemo';
import useFullCanvasContext from '/src/components/FullCanvas/hooks/useFullCanvasContext';

const initialEntities = { nextEntityId: 0 }

export const useEntities = () => {
  const [entities, setEntities] = useState(initialEntities);
  const { canvasContext } = useFullCanvasContext()

  const addEntity = (entityToAdd) => {
    setEntities(previousEntities => {
      const { nextEntityId } = previousEntities
      entityToAdd.id = nextEntityId
      entityToAdd.canvasContext = canvasContext
      return {
        ...previousEntities,
        [nextEntityId]: new Entity(entityToAdd),
        nextEntityId: nextEntityId + 1
      }
    })
  }

  const addVoid = (props) => {
    setEntities(previousEntities => {
      const { nextEntityId } = previousEntities
      return {
        ...previousEntities,
        [nextEntityId]: new Void({ ...props, id: nextEntityId, canvasContext }),
        nextEntityId: nextEntityId + 1
      }
    })
  }

  const addBall = (props) => {
    setEntities(previousEntities => {
      const { nextEntityId } = previousEntities
      return {
        ...previousEntities,
        [nextEntityId]: new Ball({ ...props, id: nextEntityId, canvasContext }),
        nextEntityId: nextEntityId + 1
      }
    })
  }

  const addDVDBounceDemo = (props) => {
    setEntities(previousEntities => {
      const { nextEntityId } = previousEntities
      return {
        ...previousEntities,
        [nextEntityId]: new DVDBounceDemo({ ...props, id: nextEntityId, canvasContext }),
        nextEntityId: nextEntityId + 1
      }
    })
  }

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