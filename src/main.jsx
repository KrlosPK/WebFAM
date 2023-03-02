import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

//? Context
import { SessionContextProvider } from './context/SessionContext'
import { ToastifyContextProvider } from './context/ToastifyContext'

import { App } from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <SessionContextProvider>
    <ToastifyContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToastifyContextProvider>
  </SessionContextProvider>
)
