import { createContext, useState } from 'react'

const SessionContext = createContext({})

export const SessionContextProvider = ({ children }) => {
  const [session, setSession] = useState(false)

  return (
    <SessionContext.Provider value={{ session, setSession }}>{children}</SessionContext.Provider>
  )
}

export { SessionContext }
