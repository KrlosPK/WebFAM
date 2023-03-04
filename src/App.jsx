//? Hooks
import { Route, Routes } from 'react-router-dom'

import {
  Home,
  Login,
  Register,
  NotFound,
  RecoverPassword,
  ResetPassword
} from './components/Home/Home'

export const App = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <>
            <Home />
          </>
        }
      />
      <Route path='/login' element={<Login />} />
      <Route path='/recover-password' element={<RecoverPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/register' element={<Register />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
