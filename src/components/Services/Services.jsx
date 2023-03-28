// ? Components
import { Navbar, ResponsiveNav } from '../Utils'
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
import Cookies from 'js-cookie'

const Services = () => {
  // ? Context
  const { session } = useContext(SessionContext)
  const { toastify, setToastify } = useContext(ToastifyContext)

  const [button, setButton] = useState(null)
  const [idRol, setIdRol] = useState(null)

  useEffect(() => {
    if (toastify === 'serviceCreated') {
      toast.success('¡Servicio creado con éxito!', {
        theme: 'colored'
      })
      setToastify(false)
    }
    if (toastify === 'serviceDesactive') {
      toast.success('¡Servicio desactivado con éxito!', {
        theme: 'colored'
      })
      setToastify(false)
    }
    if (toastify === 'serviceActive') {
      toast.success('¡Servicio activado con éxito!', {
        theme: 'colored'
      })
      setToastify(false)
    }
    if (toastify === 'citaAgendada') {
      toast.success('¡Cita agendada con éxito!', {
        theme: 'colored'
      })
      setToastify(false)
    }
    if (toastify === 'citaAgendadaError') {
      toast.error('¡Hubo un error al crear la cita!', {
        theme: 'colored'
      })
      setToastify(false)
    }
    if (toastify === 'citaAgendadaRepetida') {
      toast.warning(
        '¡Ya tienes una cita pendiente! Por favor, elimínala si ya no la necesitas o espera a que te demos una respuesta.',
        {
          theme: 'colored'
        }
      )
      setToastify(false)
    }
  }, [toastify])

  useEffect(() => {
    !session ? setButton(1) : setButton(2)
  }, [])

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
    window.scrollTo(0, 0)

    document.title = 'FADEMET Montajes | Servicios'
  }, [])

  return (
    <>
      <ToastContainer transition={Zoom} limit={3} pauseOnFocusLoss={false} />
      <ResponsiveNav
        linkText={
          !session
            ? ['Inicio', 'Servicios']
            : idRol && idRol === 2
              ? ['Inicio', 'Servicios', 'Mis Agendas', 'Preguntas Frecuentes']
              : ['Inicio', 'Agendas', 'Servicios', 'Preguntas Frecuentes']
        }
        linkUrl={
          !session
            ? ['/', '/services']
            : idRol && idRol === 2
              ? ['/', '/services', '/mis-citas', '/frequent-questions']
              : ['/', '/citas', '/services', '/frequent-questions']
        }
        renderButtons={button}
      />
      <Navbar
        linkText={
          !session
            ? ['Inicio', 'Servicios']
            : idRol && idRol === 2
              ? ['Inicio', 'Servicios', 'Mis Agendas', 'Preguntas Frecuentes']
              : ['Inicio', 'Agendas', 'Servicios', 'Preguntas Frecuentes']
        }
        linkUrl={
          !session
            ? ['/', '/services']
            : idRol && idRol === 2
              ? ['/', '/services', '/mis-citas', '/frequent-questions']
              : ['/', '/citas', '/services', '/frequent-questions']
        }
        renderButtons={button}
      />
      <AboutUs />
      <Footer />
    </>
  )
}

export { Services }
