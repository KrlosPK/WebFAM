import { createContext, useState } from 'react'

const SessionContext = createContext({})

export const SessionContextProvider = ({ children }) => {
  const tempStorage = sessionStorage.getItem('session')
  const [tempSession, setTempSession] = useState(tempStorage)

  const storage = localStorage.getItem('session')
  const [session, setSession] = useState(storage)

  return (
    <SessionContext.Provider value={{ session, setSession, tempSession, setTempSession }}>
      {children}
    </SessionContext.Provider>
  )
}

export { SessionContext }
