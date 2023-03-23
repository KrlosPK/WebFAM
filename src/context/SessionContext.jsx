import { createContext, useState } from 'react'

const SessionContext = createContext({})

export const SessionContextProvider = ({ children }) => {
  const [session, setSession] = useState(null)

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  )
}

export { SessionContext }
