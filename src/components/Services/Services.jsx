// ? Components
import { getToken, Navbar, ResponsiveNav } from '../Utils'
import { Footer } from '../Home/Footer/Footer'
import { AboutUs } from '../AboutUs/AboutUs'

//* Hooks
import { useContext, useEffect, useState } from 'react'
import { SessionContext } from '../../context/SessionContext'
import jwtDecode from 'jwt-decode'
import { ToastifyContext } from '../../context/ToastifyContext'
import { toast, ToastContainer, Zoom } from 'react-toastify'

const Services = () => {
  // ? Context
  const { session, tempSession } = useContext(SessionContext)
  const { toastify } = useContext(ToastifyContext)

  useEffect(() => {
    if (toastify === 'serviceCreated') {
      toast.success('¡Servicio creado con éxito!', {
        theme: 'colored'
      })
    }
  }, [toastify])

  const [button, setButton] = useState(null)
  const [idRol, setIdRol] = useState(null)

  useEffect(() => {
    !session ? setButton(1) : setButton(2)
    !tempSession ? setButton(1) : setButton(2)
  }, [session, tempSession])

  // ! Cambiar título de la página
  const [title, setTitle] = useState('FADEMET Montajes | Servicios')

  useEffect(() => {
    const token = getToken()

    if (token !== null) {
      new Promise((resolve, reject) => {
        const decoded = jwtDecode(token)
        resolve(decoded.data)
        reject(new Error('Error al decodificar el token'))
      }).then((decoded) => {
        setIdRol(decoded[0].id_rol)
      })
    }
  }, [])

  useEffect(() => {
    // ? Scroll to top
    window.scrollTo(0, 0)

    document.title = title
  }, [setTitle])

  return (
    <>
      <ToastContainer transition={Zoom} limit={3} pauseOnFocusLoss={false} />
      <ResponsiveNav
        linkText={ idRol !== null && idRol !== 2 ? ['Inicio', 'Agendas', 'Servicios'] : ['Inicio', 'Servicios']}
        linkUrl={ idRol !== null && idRol !== 2 ? ['/', '/citas', '/services'] : ['/', '/services']}
        renderButtons={button}
      />
      <Navbar
        linkText={ idRol !== null && idRol !== 2 ? ['Inicio', 'Agendas', 'Servicios'] : ['Inicio', 'Servicios']}
        linkUrl={ idRol !== null && idRol !== 2 ? ['/', '/citas', '/services'] : ['/', '/services']}
        renderButtons={button}
      />
      <AboutUs />
      <Footer />
    </>
  )
}

export { Services }
