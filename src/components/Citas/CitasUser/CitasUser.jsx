import './CitasUser.css'

// ? Components
import { API_URL, LongCard, /* LongCard, */ Navbar, ResponsiveNav } from '../../Utils'
import { useContext, useEffect, useMemo, useState } from 'react'
import { SessionContext } from '../../../context/SessionContext'
import { Footer } from '../../Home/Footer/Footer'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import { Button } from '@mui/material'
import { Cita } from '../Cita'
// import { Button } from '@mui/material'

// ? Hooks
// import { useContext, useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'

// ? Context
// import { SessionContext } from '../../context/SessionContext'

// ? Libraries
// import jwtDecode from 'jwt-decode'
// import axios from 'axios'
// import Cookies from 'js-cookie'

const CitasUser = () => {
  const { session } = useContext(SessionContext)

  const [button, setButton] = useState(null)
  const [datesState, setDatesState] = useState('pendientes')
  const [citaPendientesData, setCitaPendientesData] = useState(null)
  const [citasRespondidasData, setCitasRespondidasData] = useState(null)
  const [userPhoto, setUserPhoto] = useState(null)
  const [servicePhoto, setServicePhoto] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    !session ? setButton(1) : setButton(2)
  }, [])

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      navigate('/login')
      return
    }
    const decoded = jwtDecode(token)
    const { id_usuario, foto_perfil } = decoded.data[0]
    axios
      .get(API_URL(`citasPendientesUsuario/${id_usuario}`))
      .then(async ({ data }) => {
        const { cita } = data
        const getServicePhoto = await axios.get(API_URL(`servicios/${cita[0].id_servicio}`))
        setServicePhoto(getServicePhoto.data.service[0].foto_servicio)
        setUserPhoto(foto_perfil)
        setCitaPendientesData(cita[0])
      })
      .catch(() => {
        setCitaPendientesData(false)
        throw new Error('ERROR_GET_SCHEDULES')
      })
  }, [])

  const memoizedPendientesData = useMemo(() => citaPendientesData, [citaPendientesData])
  const memoizedRespondidasData = useMemo(() => citasRespondidasData, [citasRespondidasData])

  const fetchPhotos = async (citas, userPhoto) => {
    try {
      const updatedCitas = await Promise.all(
        citas && citas.map(async ({ id_usuario, id_servicio, ...cita }) => {
          const servicePhotoResponse = await axios.get(API_URL(`servicios/${id_servicio}`))
          const servicePhotoData = servicePhotoResponse?.data?.service?.[0]?.foto_servicio ?? '/techo-metálico.jpg'
          return { ...cita, userPhoto, servicePhotoData }
        })
      )
      return updatedCitas
    } catch (error) {
      console.error('Error al obtener las fotos:', error)
      throw new Error('Error al obtener las fotos')
    }
  }

  const updateCitasRespondidasData = (citas) => setCitasRespondidasData(citas)

  const fetchCitasRespondidas = async () => {
    try {
      const token = Cookies.get('token')
      const decoded = jwtDecode(token)
      const { id_usuario, foto_perfil } = decoded.data[0]
      const { data } = await axios.get(API_URL(`citasRespondidasUsuario/${id_usuario}`))
      const updatedCitas = await fetchPhotos(data.cita, foto_perfil)
      updateCitasRespondidasData(updatedCitas)
    } catch (err) {
      updateCitasRespondidasData(false)
    }
  }

  useEffect(() => {
    fetchCitasRespondidas()
  }, [])

  const loading = !memoizedPendientesData && !memoizedRespondidasData

  const getCitas = (data) => data.map(Cita)

  return (
    <>
      <ResponsiveNav
        linkText={['Inicio', 'Servicios', 'Mis Agendas']}
        linkUrl={['/', '/services', '/mis-citas']}
        renderButtons={button}
      />
      <Navbar
        linkText={['Inicio', 'Servicios', 'Mis Agendas']}
        linkUrl={['/', '/services', '/mis-citas']}
        renderButtons={button}
      />
      <section>
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

        {memoizedPendientesData && datesState === 'pendientes' && (
          <div key={memoizedPendientesData.id_cita} className='cita'>
            <label
              className='id-cita'
              style={
                memoizedPendientesData.estado === 'pendiente'
                  ? { color: '#fd8b26', outline: '2px solid #fd8b26' }
                  : { color: '#3ae374', outline: '2px solid #3ae374' }
              }
            >
              {`${memoizedPendientesData.estado.charAt(0).toUpperCase() + memoizedPendientesData.estado.slice(1)} #${memoizedPendientesData.id_cita}`}
            </label>
            <LongCard
              foto_usuario={userPhoto || '/default-avatar.png'}
              nombre_completo={`Solicitante: ${memoizedPendientesData.nombre_completo}`}
              correo={memoizedPendientesData.correo}
              num_celular={`+57 ${memoizedPendientesData.num_celular}`}
              nombre_servicio={memoizedPendientesData.nombre_servicio}
              descripcion_cita={memoizedPendientesData.descripcion_cita || 'Sin descripción'}
              foto_servicio={servicePhoto || '/techo-metálico.jpg'}
              fecha_servicio={new Date(memoizedPendientesData.fecha_creacion_cita).toLocaleDateString()}
              hora_servicio={memoizedPendientesData.hora_creacion_cita.substring(0, 5)}
              estado_servicio={memoizedPendientesData.estado}
            />
          </div>
        )}

        {memoizedRespondidasData &&
          datesState === 'respondidas' &&
          getCitas(memoizedRespondidasData)
        }
        <Footer />
      </section>
    </>
  )
}

export { CitasUser }
