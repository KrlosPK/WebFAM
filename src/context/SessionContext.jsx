import Cookies from 'js-cookie'
import { createContext, useState } from 'react'

const SessionContext = createContext({})

export const SessionContextProvider = ({ children }) => {
  const sessionCookie = Cookies.get('session')
  const [session, setSession] = useState(sessionCookie)

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  )
}

export { SessionContext }
