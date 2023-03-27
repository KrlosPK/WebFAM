import './CitaDetalle.css'

// ? Components
import { API_URL, Navbar, ResponsiveNav } from '../../Utils'
import { Footer } from '../../Home/Footer/Footer'

// ? Hooks
import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'

// ? Context
import { SessionContext } from '../../../context/SessionContext'
import jwtDecode from 'jwt-decode'

// * Libs
import Cookies from 'js-cookie'
import axios from 'axios'
import { Button } from '@mui/material'
import { ToastifyContext } from '../../../context/ToastifyContext'

const CitaDetalle = () => {
  const { idCita } = useParams()
  const { session } = useContext(SessionContext)
  const { setToastify } = useContext(ToastifyContext)

  const [button, setButton] = useState(null)
  const [idRol, setIdRol] = useState(null)
  const navigate = useNavigate()

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

    document.title = `FADEMET Montajes | Cita ${idCita}`
  }, [])

  const responderCita = () => {
    axios.patch(API_URL(`eliminarCita/${idCita}`), { estado: 'respondido' }).then(() => {
      setToastify('citaRespondida')
      navigate('/citas')
    })
  }

  return (
    <>
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
      <section className='cita-detalle'>
        <h1 className='cita-detalle__title'>Cita #{idCita}</h1>
        <Button
          onClick={responderCita}
          sx={{ borderRadius: '10px' }}
          color='success'
          variant='contained'
        >
          Marcar como Respondida
        </Button>
      </section>
      <Footer />
    </>
  )
}

export { CitaDetalle }
