import { useState, useEffect, Fragment } from 'react'
import useGame from '/src/state/useGame'
import useGameTime from '/src/state/useGameTime'
import useEntities from '/src/state/useEntities'
import useCamera from '/src/state/useCamera'
import './index.css'

const DebugMenu = () => {
  const { gameTime } = useGameTime()
  const { entities, removeEntityById } = useEntities()
  const { initializeGame } = useGame()
  const { cameraCenter, cameraEntityToFollow, setCameraEntityToFollow, setCameraCenter } = useCamera()
  const [isOpen, setIsOpen] = useState(false)
  const [isEntitiesExpanded, setIsEntitiesExpanded] = useState(false)
  const [entitySeachValue, setEntitySeachValue] = useState('')

  const toggleIsEntitiesExpanded = () => setIsEntitiesExpanded(!isEntitiesExpanded)

  const handleTildePress = (event) => {
    if (event.key === '~' && event.shiftKey) {
      setIsOpen((isOpen) => !isOpen)
    }
  };

  const handleEntitySearchValueChange = (event) => {
    setEntitySeachValue(event.target.value)
  }

  useEffect(() => {
    document.addEventListener('keydown', handleTildePress)

    return () => {
      document.removeEventListener('keydown', handleTildePress)
    };
  }, []);

  const entityKeysToIgnore = ['canvasContext', 'id']

  return isOpen ? (
    <div id="DebugMenu">
      <h2>Debug Menu</h2>
      <button onClick={initializeGame}>
        Restart Game
      </button>
      <p>Time: {gameTime}</p>
      <p>Camera Center: (x:{cameraCenter.x}, y:{cameraCenter.y})</p>
      <button id="EntitiesTitle" onClick={toggleIsEntitiesExpanded}>{`${isEntitiesExpanded ? 'Hide' : 'Show'} `} Entities</button>
      {isEntitiesExpanded && <>
        <p>Number of Entities: {Object.keys(entities).length - 1}</p>
        <label htmlFor="nameSearch">
          Search Entity by name: <input id="nameSearch" value={entitySeachValue} onChange={handleEntitySearchValueChange} />
        </label>
        <dl>
          {Object.values(entities)
            .filter(entity => entity.name?.toLowerCase().includes(entitySeachValue.toLowerCase()))
            .slice(0, 10)
            .map(entity =>
              <Fragment key={entity.id}>
                <dt>{entity.id}</dt>
                <dd>
                  {Object.entries(entity).map(([key, value]) => (
                    !entityKeysToIgnore.includes(key) && <span key={key}>{key}: {JSON.stringify(value)}<br/></span>
                  ))}
                  <button onClick={() => removeEntityById(entity.id)}>
                    Delete
                  </button>
                  <button onClick={() => {
                    if (cameraEntityToFollow) {
                      setCameraEntityToFollow(undefined)
                    }
                    setCameraCenter(entity)
                  }}>
                    Find
                  </button>
                  <button onClick={() => setCameraEntityToFollow(entity)}>
                    Follow
                  </button>
                </dd>
              </Fragment>
            )
          }
        </dl>
      </>}
    </div>
  ) : null
}

export default DebugMenu