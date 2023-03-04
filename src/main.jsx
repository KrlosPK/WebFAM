import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

//? Context
import { SessionContextProvider } from './context/SessionContext'
import { ToastifyContextProvider } from './context/ToastifyContext'

import { App } from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <SessionContextProvider>
    <ToastifyContextProvider>
      <BrowserRouter>
        <GoogleOAuthProvider clientId='294667816272-supt23ie3grtgl1ed50n6e1et58st5f1.apps.googleusercontent.com'>
          <App />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </ToastifyContextProvider>
  </SessionContextProvider>
)
