import { createContext, useState } from 'react'

const SessionContext = createContext({})

export const SessionContextProvider = ({ children }) => {
  const storage = localStorage.getItem('session')
  const [session, setSession] = useState(storage)

  return (
    <SessionContext.Provider value={{ session, setSession }}>{children}</SessionContext.Provider>
  )
}

export { SessionContext }
