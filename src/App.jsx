import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Utils'
import { Home } from './components/Home/Home'
import { Login } from './components/Login/Login'
import { Register } from './components/Register/Register'
import { NotFound } from './components/Not-found/NotFound'
import { ResponsiveNav } from './components/Utils'

export const App = () => {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <ResponsiveNav
                elementText={['Inicio', 'Productos', 'Servicios', 'Preguntas Frecuentes']}
                url={['/', '/', '/', '/']}
                renderButtons={true}
              />
              <Navbar
                elementTextLeft={['Inicio', 'Productos', 'Servicios']}
                urlLeft={['/', '/', '/']}
                elementTextRight={['Preguntas Frecuentes']}
                urlRight={['/']}
                renderButtons={true}
              />
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
    </>
  )
}
