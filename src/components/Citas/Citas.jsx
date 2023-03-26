import './Citas.css'
import { Footer } from '../Home/Footer/Footer'
import { API_URL, Navbar, ResponsiveNav } from '../Utils'
import { Cita } from './Cita'
import { Button } from '@mui/material'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SessionContext } from '../../context/SessionContext'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import Cookies from 'js-cookie'
import { toast, ToastContainer, Zoom } from 'react-toastify'
import { ToastifyContext } from '../../context/ToastifyContext'

const Citas = () => {
  const { session } = useContext(SessionContext)
  const { toastify } = useContext(ToastifyContext)

  const [button, setButton] = useState(null)
  const navigate = useNavigate()

  const [citasPendientesData, setCitasPendientesData] = useState(null)
  const [citasRespondidasData, setCitasRespondidasData] = useState(null)
  const [datesState, setDatesState] = useState('pendientes')

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) navigate('/login')

    const decode = jwtDecode(token)
    const [{ id_rol }] = decode.data
    if (id_rol === 2) navigate('/')

    !session ? setButton(1) : setButton(2)

    document.title = 'FADEMET Montajes | Citas'

    if (toastify === 'citaRespondida') {
      toast.success('Cita respondida con éxito', {
        theme: 'colored'
      })
    }
  }, [])

  const fetchPhotos = async (citas) => {
    try {
      const updatedCitas = await Promise.all(
        citas.map(async ({ id_usuario, id_servicio, ...cita }) => {
          const [userPhotoResponse, servicePhotoResponse] = await axios.all([
            axios.get(API_URL(`usuarios/${id_usuario}`)),
            axios.get(API_URL(`servicios/${id_servicio}`))
          ])
          const userPhoto = userPhotoResponse?.data?.user?.[0]?.foto_perfil ?? '/default-avatar.png'
          const servicePhoto =
            servicePhotoResponse?.data?.service?.[0]?.foto_servicio ?? '/techo-metálico.jpg'
          return { ...cita, userPhoto, servicePhoto }
        })
      )
      return updatedCitas
    } catch (error) {
      console.error('Error al obtener las fotos:', error)
      throw new Error('Error al obtener las fotos')
    }
  }

  const updateCitasPendientesData = (citas) => setCitasPendientesData(citas)

  const updateCitasRespondidasData = (citas) => setCitasRespondidasData(citas)

  const fetchCitasPendientes = async () => {
    try {
      const { data } = await axios.get(API_URL('citasPendientes'))
      const updatedCitas = await fetchPhotos(data.citas)
      updatedCitas.push({ ...updatedCitas[0], isLink: true })
      updatedCitas.shift()
      updateCitasPendientesData(updatedCitas)
    } catch (err) {
      updateCitasPendientesData(false)
    }
  }

  const fetchCitasRespondidas = async () => {
    try {
      const { data } = await axios.get(API_URL('citasRespondidas'))
      const updatedCitas = await fetchPhotos(data.citas)
      updateCitasRespondidasData(updatedCitas)
    } catch (err) {
      updateCitasRespondidasData(false)
    }
  }

  useEffect(() => {
    fetchCitasPendientes()
    fetchCitasRespondidas()
  }, [])

  const memoizedPendientesData = useMemo(() => citasPendientesData, [citasPendientesData])
  const memoizedRespondidasData = useMemo(() => citasRespondidasData, [citasRespondidasData])

  const getCitas = (data) => data.map(Cita)

  const loading = !memoizedPendientesData && !memoizedRespondidasData

  return (
    <>
      <ToastContainer transition={Zoom} limit={3} pauseOnFocusLoss={false} />
      <ResponsiveNav
        linkText={['Inicio', 'Agendas', 'Servicios']}
        linkUrl={['/', '/citas', '/services']}
        renderButtons={button}
      />
      <Navbar
        linkText={['Inicio', 'Agendas', 'Servicios']}
        linkUrl={['/', '/citas', '/services']}
        renderButtons={button}
      />

      <section className='citas'>
        <nav className='citas-nav'>
          <ul className='citas-nav__ul'>
            <Button
              variant='text'
              className={datesState === 'pendientes' ? 'cita-active' : ''}
              onClick={() => setDatesState('pendientes')}
              color='inherit'
              sx={{ fontFamily: 'Syne' }}
            >
              Pendientes
            </Button>
            <Button
              variant='text'
              className={datesState === 'respondidas' ? 'cita-active' : ''}
              onClick={() => setDatesState('respondidas')}
              color='inherit'
              sx={{ fontFamily: 'Syne' }}
            >
              Respondidas
            </Button>
          </ul>
        </nav>

        {loading && <div className='citas-loader'>Cargando...</div>}

        {!loading && (
          <>
            {((!memoizedRespondidasData && datesState === 'respondidas') ||
              (!memoizedPendientesData && datesState === 'pendientes')) && (
              <div className='title__center'>No hay citas {datesState}</div>
            )}
          </>
        )}

        {memoizedPendientesData && datesState === 'pendientes' && getCitas(memoizedPendientesData)}

        {memoizedRespondidasData &&
          datesState === 'respondidas' &&
          getCitas(memoizedRespondidasData)
        }
      </section>
      <Footer />
    </>
  )
}

export { Citas }
