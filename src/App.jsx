//? Hooks
import { Route, Routes } from 'react-router-dom'

import { Home } from './components/Home/Home'
import { Login } from './components/Login/Login'
import { Register } from './components/Register/Register'
import { NotFound } from './components/Not-found/NotFound'
import { RecoverPassword } from './components/Login/RecoverPassword/RecoverPassword'
import { ResetPassword } from './components/Login/ResetPassword/ResetPassword'
import { EditUser } from './components/EditUser/EditUser'

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/recover-password' element={<RecoverPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/register' element={<Register />} />
      {/* <Route path='/edit-user' element={<EditUser />} /> */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
