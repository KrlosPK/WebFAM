// ? Hooks
import { Route, Routes } from 'react-router-dom'
import { useContext } from 'react'

//* Components
import { Home } from './components/Home/Home'
import { Login } from './components/Login/Login'
import { Register } from './components/Register/Register'
import { Services } from './components/Services/Services'
import { Service } from './components/Services/Service/Service'
import { Citas } from './components/Citas/Citas'
import { CitaDetalle } from './components/Citas/CitaDetalle/CitaDetalle'
import { EditUser } from './components/EditUser/EditUser'
import { RecoverPassword } from './components/Login/RecoverPassword/RecoverPassword'
import { AddService } from './components/Services/AddService/AddService'
import { AllUsers } from './components/AllUsers/AllUsers'
import { InfoUserEdit } from './components/AllUsers/EditUser/InfoUserEdit'
import { EditService } from './components/Services/EditService/EditService'

import { NotFound } from './components/Not-found/NotFound'
import { ResetPassword } from './components/Login/ResetPassword/ResetPassword'

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

      <Route element={<ProtectedRoute session={!tempSession} redirectTo='/login' />}>
        <Route path='/citas' element={<Citas />} />
        <Route path='/citas/:idCita' element={<CitaDetalle />} />
      </Route>

      <Route path='/recover-password' element={<RecoverPassword />} />

      <Route path='/reset-password/:token' element={<ResetPassword />} />
      <Route path='/' element={<Home />} />

      <Route path='/services' element={<Services />} />
      <Route path='/add-service' element={<AddService />} />
      <Route path='/services/:serviceId' element={<Service />} />
      <Route path='/edit-service/:serviceId' element={<EditService />} />

      <Route path='/all-users' element={<AllUsers />} />
      <Route path='/info-user-edit/:id' element={<InfoUserEdit />} />

      <Route path='/recover-password' element={<RecoverPassword />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
