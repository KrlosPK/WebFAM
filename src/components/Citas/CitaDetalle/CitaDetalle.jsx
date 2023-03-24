import './CitaDetalle.css'

// ? Components
import { ToastContainer, Zoom } from 'react-toastify'
import { Navbar, ResponsiveNav } from '../../Utils'
import { Footer } from '../../Home/Footer/Footer'

// ? Hooks
import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'

// ? Context
import { SessionContext } from '../../../context/SessionContext'
import jwtDecode from 'jwt-decode'

// * Libs
import Cookies from 'js-cookie'

const CitaDetalle = () => {
  const { idCita } = useParams()
  const { session } = useContext(SessionContext)

  const [button, setButton] = useState(null)
  const [idRol, setIdRol] = useState(null)

  useEffect(() => {
    const token = Cookies.get('token')

    if (!token) return

    new Promise((resolve, reject) => {
      const decoded = jwtDecode(token)
      resolve(decoded.data)
      reject(new Error('Error al decodificar el token'))
    }).then((decoded) => {
      setIdRol(decoded[0].id_rol)
    })
  }, [])

  useEffect(() => {
    !session ? setButton(1) : setButton(2)

    window.scrollTo(0, 0)

    document.title = 'FADEMET Montajes | Cita'
  }, [])

  return (
    <>
      <ToastContainer transition={Zoom} limit={3} pauseOnFocusLoss={false} />
      <ResponsiveNav
        linkText={
          !session
            ? ['Inicio', 'Servicios']
            : idRol && idRol === 2
              ? ['Inicio', 'Servicios', 'Mis Agendas']
              : ['Inicio', 'Agendas', 'Servicios']
        }
        linkUrl={
          !session
            ? ['/', '/services']
            : idRol && idRol === 2
              ? ['/', '/services', '/mis-citas']
              : ['/', '/citas', '/services']
        }
        renderButtons={button}
      />
      <Navbar
        linkText={
          !session
            ? ['Inicio', 'Servicios']
            : idRol && idRol === 2
              ? ['Inicio', 'Servicios', 'Mis Agendas']
              : ['Inicio', 'Agendas', 'Servicios']
        }
        linkUrl={
          !session
            ? ['/', '/services']
            : idRol && idRol === 2
              ? ['/', '/services', '/mis-citas']
              : ['/', '/citas', '/services']
        }
        renderButtons={button}
      />
      <h1>Cita {idCita}</h1>
      <Footer />
    </>
  )
}

export { CitaDetalle }
