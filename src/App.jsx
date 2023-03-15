// ? Hooks
import { Route, Routes } from 'react-router-dom'
import { useContext } from 'react'

//* Components
import { Home } from './components/Home/Home'
import { Login } from './components/Login/Login'
import { Register } from './components/Register/Register'
import { Services } from './components/Services/Services'
import { Service } from './components/Services/Service/Service'
import { EditUser } from './components/EditUser/EditUser'
import { RecoverPassword } from './components/Login/RecoverPassword/RecoverPassword'

import { NotFound } from './components/Not-found/NotFound'
// import { ResetPassword } from './components/Login/ResetPassword/ResetPassword'

import { ProtectedRoute } from './components/Utils'

// ? Context
import { SessionContext } from './context/SessionContext'

export const App = () => {
  const { tempSession } = useContext(SessionContext)

  return (
    <Routes>
      <Route element={<ProtectedRoute session={tempSession} />}>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Route>
      {tempSession && <Route path='/account' element={<EditUser />} />}

      <Route path='/recover-password' element={<RecoverPassword />} />

      {/* //TODO Ruta Con Parámetro */}
      {/* <Route path='/reset-password' element={<ResetPassword />} /> */}
      <Route path='/' element={<Home />} />

      <Route path='/services' element={<Services />} />
      <Route path='/services/:serviceId' element={<Service />} />

      <Route path='/recover-password' element={<RecoverPassword />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
