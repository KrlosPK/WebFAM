// ? Components
import { getToken, Navbar, ResponsiveNav } from '../Utils'
import { Footer } from '../Home/Footer/Footer'
import { AboutUs } from '../AboutUs/AboutUs'

//* Hooks
import { useContext, useEffect, useState } from 'react'

//* Context
import { SessionContext } from '../../context/SessionContext'

//* Libraries
import jwtDecode from 'jwt-decode'
import { ToastifyContext } from '../../context/ToastifyContext'
import { toast, ToastContainer, Zoom } from 'react-toastify'

const Services = () => {
  // ? Context
  const { session, tempSession } = useContext(SessionContext)
  const { toastify } = useContext(ToastifyContext)

  const [button, setButton] = useState(null)
  const [idRol, setIdRol] = useState(null)

  useEffect(() => {
    if (toastify === 'serviceCreated') {
      toast.success('¡Servicio creado con éxito!', {
        theme: 'colored'
      })
    }
  }, [toastify])

  useEffect(() => {
    !session ? setButton(1) : setButton(2)
    !tempSession ? setButton(1) : setButton(2)
  }, [session, tempSession])

  useEffect(() => {
    const token = getToken()

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
    window.scrollTo(0, 0)

    document.title = 'FADEMET Montajes | Servicios'
  }, [])

  return (
    <>
      <ToastContainer transition={Zoom} limit={3} pauseOnFocusLoss={false} />
      <ResponsiveNav
        linkText={
          idRol && idRol !== 2 ? ['Inicio', 'Agendas', 'Servicios'] : ['Inicio', 'Servicios']
        }
        linkUrl={idRol && idRol !== 2 ? ['/', '/citas', '/services'] : ['/', '/services']}
        renderButtons={button}
      />
      <Navbar
        linkText={
          idRol && idRol !== 2 ? ['Inicio', 'Agendas', 'Servicios'] : ['Inicio', 'Servicios']
        }
        linkUrl={idRol && idRol !== 2 ? ['/', '/citas', '/services'] : ['/', '/services']}
        renderButtons={button}
      />
      <AboutUs />
      <Footer />
    </>
  )
}

export { Services }
