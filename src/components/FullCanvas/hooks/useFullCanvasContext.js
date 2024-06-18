import React, { useContext } from 'react'

export const FullCanvasContext = React.createContext({})

export const useFullCanvasContext = () => useContext(FullCanvasContext)

export default useFullCanvasContext
