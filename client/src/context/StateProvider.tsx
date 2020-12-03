import React, { createContext, useReducer, useContext } from "react"

export const StateContext = createContext({} as any)

export const StateProvider = ({ reducer, initialState, children }: any) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
)

export const useStateValue = () => useContext(StateContext)
