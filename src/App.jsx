// ? Hooks
import { Route, Routes } from 'react-router-dom'
import { useContext } from 'react'

//* Components
import { Home } from './components/Home/Home'
import { Login } from './components/Login/Login'
import { Register } from './components/Register/Register'
import { NotFound } from './components/Not-found/NotFound'
import { RecoverPassword } from './components/Login/RecoverPassword/RecoverPassword'
// import { ResetPassword } from './components/Login/ResetPassword/ResetPassword'
import { EditUser } from './components/EditUser/EditUser'

import { ProtectedRoute } from './components/ProtectedRoute'

// ? Context
import { SessionContext } from './context/SessionContext'

export const App = () => {
  const { tempSession } = useContext(SessionContext)

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route element={<ProtectedRoute session={tempSession} />}>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Route>
      {tempSession && <Route path='/account' element={<EditUser />} />}

      <Route path='/recover-password' element={<RecoverPassword />} />

      {/* //TODO Ruta Con Parámetro */}
      {/* <Route path='/reset-password' element={<ResetPassword />} /> */}

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
