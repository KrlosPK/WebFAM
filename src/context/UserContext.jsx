import { createContext, useState } from 'react'

const UserContext = createContext({})

export const UserContextProvider = ({ children }) => {
  const [session, setSession] = useState(false)

  return <UserContext.Provider value={{ session, setSession }}>{children}</UserContext.Provider>
}

export { UserContext }
