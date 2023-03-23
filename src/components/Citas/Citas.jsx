import './Citas.css'

// ? Components
import { Footer } from '../Home/Footer/Footer'
import { API_URL, LongCard, Navbar, ResponsiveNav } from '../Utils'
import { Button } from '@mui/material'

// ? Hooks
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// ? Context
import { SessionContext } from '../../context/SessionContext'

// ? Libraries
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import Cookies from 'js-cookie'

const Citas = () => {
  const { session } = useContext(SessionContext)

  const [button, setButton] = useState(null)
  const navigate = useNavigate()

  const [citasData, setCitasData] = useState(null)
  const [datesState, setDatesState] = useState('pendientes')

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) return navigate('/login')
    const decode = jwtDecode(token)
    const { id_rol } = decode.data[0]
    if (id_rol === 2) return navigate('/')
  }, [])

  useEffect(() => {
    !session ? setButton(1) : setButton(2)

    window.scrollTo(0, 0)

    document.title = 'FADEMET Montajes | Citas'
  }, [])

  async function fetchPhotos (citas) {
    const updatedCitas = []
    for (const cita of citas) {
      const { id_usuario, id_servicio } = cita
      const [userPhotoResponse, servicePhotoResponse] = await Promise.all([
        axios.get(API_URL(`usuarios/${id_usuario}`)),
        axios.get(API_URL(`servicios/${id_servicio}`))
      ])
      const { foto_perfil } = userPhotoResponse.data.user[0]
      const { foto_servicio } = servicePhotoResponse.data.service[0]
      updatedCitas.push({ ...cita, userPhoto: foto_perfil, servicePhoto: foto_servicio })
    }
    return updatedCitas
  }

  useEffect(() => {
    axios
      .get(API_URL('citas'))
      .then(({ data }) => {
        const { citas } = data
        fetchPhotos(citas).then((updatedCitas) => {
          setCitasData(updatedCitas)
        })
      })
      .catch(() => {
        throw new Error('Error al obtener las citas')
      })
  }, [])

  // useEffect(() => {
  //   axios
  //     .get(API_URL('citas'))
  //     .then(({ data }) => {
  //       const { citas } = data
  //       setCitasData(citas)
  //       const updatedCitas = []
  //       const fetchUserPhotos = citas.map(async (cita) => {
  //         const { id_usuario, id_servicio } = cita
  //         const userPhotoResponse = await axios.get(API_URL(`usuarios/${id_usuario}`))
  //         const { foto_perfil } = userPhotoResponse.data.user[0]
  //         const servicePhotoResponse = await axios.get(API_URL(`servicios/${id_servicio}`))
  //         const { foto_servicio } = servicePhotoResponse.data.service[0]
  //         updatedCitas.push({ ...cita, userPhoto: foto_perfil, servicePhoto: foto_servicio })
  //       })
  //       Promise.all(fetchUserPhotos).then(() => {
  //         setCitasData(updatedCitas)
  //       })
  //     })
  //     .catch(() => {
  //       throw new Error('Error al obtener las citas')
  //     })
  // }, [])

  return (
    <>
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
              className={datesState}
              onClick={() => setDatesState('todas')}
              color='inherit'
              sx={{ fontFamily: 'Syne', fontWeight: '400' }}
            >
              Todas
            </Button>
            <Button
              variant='text'
              className={datesState}
              onClick={() => setDatesState('pendientes')}
              color='inherit'
              sx={{ fontFamily: 'Syne', fontWeight: '400' }}
            >
              Pendientes
            </Button>
            <Button
              variant='text'
              className={datesState}
              onClick={() => setDatesState('respondidas')}
              color='inherit'
              sx={{ fontFamily: 'Syne', fontWeight: '400' }}
            >
              Respondidas
            </Button>
          </ul>
        </nav>
        {!citasData && <div className='citas-loader'>Cargando...</div>}
        {citasData &&
          datesState === 'todas' &&
          citasData.map(
            ({
              id_cita,
              nombre_completo,
              correo,
              num_celular,
              nombre_servicio,
              descripcion_cita,
              fecha_creacion_cita,
              hora_creacion_cita,
              estado,
              userPhoto,
              servicePhoto
            }) => {
              return (
                <Link to={`/citas/${id_cita}`} key={id_cita} className='cita'>
                  <span className='id-cita'>#{id_cita}</span>
                  <LongCard
                    foto_usuario={userPhoto || '/default-avatar.png'}
                    nombre_completo={nombre_completo}
                    correo={correo}
                    num_celular={`+57 ${num_celular}`}
                    nombre_servicio={nombre_servicio}
                    descripcion_cita={descripcion_cita || 'Sin descripción'}
                    foto_servicio={servicePhoto || '/techo-metálico.jpg'}
                    fecha_servicio={fecha_creacion_cita.substring(0, 10)}
                    hora_servicio={hora_creacion_cita.substring(0, 5)}
                    estado_servicio={estado}
                  />
                </Link>
              )
            }
          )}
        {citasData &&
          datesState === 'pendientes' &&
          citasData
            .filter(({ estado }) => estado === 'pendiente')
            .map(
              ({
                id_cita,
                nombre_completo,
                correo,
                num_celular,
                nombre_servicio,
                descripcion_cita,
                fecha_creacion_cita,
                hora_creacion_cita,
                estado,
                userPhoto,
                servicePhoto
              }) => {
                return (
                  <Link to={`/citas/${id_cita}`} key={id_cita} className='cita'>
                    <span className='id-cita'>#{id_cita}</span>
                    <LongCard
                      foto_usuario={userPhoto || '/default-avatar.png'}
                      nombre_completo={nombre_completo}
                      correo={correo}
                      num_celular={`+57 ${num_celular}`}
                      nombre_servicio={nombre_servicio}
                      descripcion_cita={descripcion_cita || 'Sin descripción'}
                      foto_servicio={servicePhoto || '/techo-metálico.jpg'}
                      fecha_servicio={fecha_creacion_cita.substring(0, 10)}
                      hora_servicio={hora_creacion_cita.substring(0, 5)}
                      estado_servicio={estado}
                    />
                  </Link>
                )
              }
            )}
        {citasData &&
          datesState === 'respondidas' &&
          citasData
            .filter(({ estado }) => estado === 'respondido')
            .map(
              ({
                id_cita,
                nombre_completo,
                correo,
                num_celular,
                nombre_servicio,
                descripcion_cita,
                fecha_creacion_cita,
                hora_creacion_cita,
                estado,
                userPhoto,
                servicePhoto
              }) => {
                return (
                  <Link to={`/citas/${id_cita}`} key={id_cita} className='cita'>
                    <span className='id-cita'>#{id_cita}</span>
                    <LongCard
                      foto_usuario={userPhoto || '/default-avatar.png'}
                      nombre_completo={nombre_completo}
                      correo={correo}
                      num_celular={`+57 ${num_celular}`}
                      nombre_servicio={nombre_servicio}
                      descripcion_cita={descripcion_cita || 'Sin descripción'}
                      foto_servicio={servicePhoto || '/techo-metálico.jpg'}
                      fecha_servicio={fecha_creacion_cita.substring(0, 10)}
                      hora_servicio={hora_creacion_cita.substring(0, 5)}
                      estado_servicio={estado}
                    />
                  </Link>
                )
              }
            )}
      </section>
      <Footer />
    </>
  )
}

export { Citas }
