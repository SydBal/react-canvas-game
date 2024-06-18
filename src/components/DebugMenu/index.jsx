import { useState, useEffect, Fragment } from 'react'
import useGameContext from '/src/components/Game/hooks/useGameContext'
import './index.css'

const DebugMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { gameTime, entities, removeEntityById, initializeGame } = useGameContext()
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
      <p>Number of Entities: {Object.keys(entities).length - 1}</p>
      <button id="EntitiesTitle" onClick={toggleIsEntitiesExpanded}>{`${isEntitiesExpanded ? 'Hide' : 'Show'} `} Entities</button>
      {isEntitiesExpanded && <>
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
                    Delete Entity
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