//? Hooks
import { Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import { SessionContext } from './context/SessionContext'

import { Navbar } from './components/Utils'
import { Home } from './components/Home/Home'
import { Login } from './components/Login/Login'
import { Register } from './components/Register/Register'
import { NotFound } from './components/Not-found/NotFound'
import { ResponsiveNav } from './components/Utils'

export const App = () => {
  const { session } = useContext(SessionContext)

  return (
    <Routes>
      <Route
        path='/'
        element={
          <>
            {session === false ? (
              <>
                <ResponsiveNav
                  elementText={['Inicio', 'Productos', 'Servicios', 'Preguntas Frecuentes']}
                  url={['/', '/', '/', '/']}
                  renderButtons={1}
                />
                <Navbar
                  elementText={['Inicio', 'Productos', 'Servicios', 'Preguntas Frecuentes']}
                  url={['/', '/', '/', '/']}
                  renderButtons={1}
                />
              </>
            ) : (
              <>
                <ResponsiveNav
                  elementText={['Inicio', 'Productos', 'Servicios', 'Preguntas Frecuentes']}
                  url={['/', '/', '/', '/']}
                  renderButtons={2}
                />
                <Navbar
                  elementText={['Inicio', 'Productos', 'Servicios', 'Preguntas Frecuentes']}
                  url={['/', '/', '/', '/']}
                  renderButtons={2}
                />
              </>
            )}
            <Home />
          </>
        }
      />
      <Route path='/login' element={<Login />}>
        <Route path='recover-password' />
      </Route>
      <Route path='/register' element={<Register />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
