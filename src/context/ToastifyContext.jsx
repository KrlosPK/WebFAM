import { createContext, useState } from 'react'

const ToastifyContext = createContext({})

export const ToastifyContextProvider = ({ children }) => {
  const [toastify, setToastify] = useState(false)

  return (
    <ToastifyContext.Provider value={{ toastify, setToastify }}>
      {children}
    </ToastifyContext.Provider>
  )
}

export { ToastifyContext }
