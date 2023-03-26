import './AboutUs.css'

// ? Components
import { API_URL, Button, Button2, Card } from '../Utils'
import { Link } from 'react-router-dom'

// * Hooks
import { useEffect, useMemo, useState } from 'react'

// ? Libraries
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'

const AboutUs = () => {
  const [activeServices, setActiveServices] = useState(null)
  const [inactiveServices, setInactiveServices] = useState(null)
  const [idRol, setIdRol] = useState(null)
  const [servicesState, setServicesState] = useState('active')

  useEffect(() => {
    const token = Cookies.get('token')

    if (!token) return

    if (token !== null) {
      const decode = jwtDecode(token)
      setIdRol(decode.data[0].id_rol)
    }
  }, [])

  const memoizedActiveService = useMemo(() => activeServices, [activeServices])
  const memoizedInactiveService = useMemo(() => inactiveServices, [inactiveServices])

  const updateActiveServices = (servicios) => setActiveServices(servicios)
  const updateInactiveServices = (servicios) => setInactiveServices(servicios)

  const getActiveServices = async () => {
    try {
      const { data } = await axios.get(API_URL('servicios'))
      updateActiveServices(data.services)
    } catch (err) {
      updateActiveServices(false)
    }
  }

  const getInactiveServices = async () => {
    try {
      const { data } = await axios.get(API_URL('serviciosInactivos'))
      updateInactiveServices(data.services)
    } catch (err) {
      updateInactiveServices(false)
    }
  }

  useEffect(() => {
    getInactiveServices()
    getActiveServices()
  }, [])

  const loading = (!memoizedActiveService) || (!memoizedInactiveService)

  return (
    <section className='about-us-container'>
      <div className='info'>
        <h2 className='info__title'>¡Ofrecemos los mejores servicios para nuestros clientes!</h2>
        <p className='info__subtitle'>
          En FADEMET valoramos tus deseos, por lo que trabajamos arduamente día a día para ofrecerte
          servicios que se adapten a tus necesidades y sean de la más alta calidad.
        </p>
        {idRol && idRol !== 2 && (
          <div className="gap-2 d-flex-column">
            <Link to='/add-service'>
              <Button2 width={200} text={'Crear servicio'} />
            </Link>
            {(servicesState && servicesState === 'active')
              ? (
                <Button width={200} innerOnClick={() => setServicesState('inactive')} text={'Servicios inactivos'} />

              )
              : (
                <Button width={200} innerOnClick={() => setServicesState('active')} text={'Servicios activos'} />
              )
            }
          </div>
        )}

        {(loading && !servicesState) && <div className='citas-loader'>Cargando...</div>}

        {((memoizedActiveService && memoizedActiveService.length === 0) && (servicesState && servicesState === 'active')) && (
          <div className='title__center'>No hay servicios activos</div>
        )}
        {((memoizedInactiveService && memoizedInactiveService.length === 0) && (servicesState && servicesState === 'inactive')) && (
          <div className='title__center'>No hay servicios inactivos</div>
        )}

        <div className='cards'>
          {(memoizedActiveService && servicesState === 'active') && memoizedActiveService.map(({ id_servicio, foto_servicio, nombre_servicio, resumen_servicio }) => (
            <Link to={`/services/${id_servicio}`} key={id_servicio}>
              <Card src={foto_servicio} title={nombre_servicio} description={resumen_servicio} isButton buttonText={'Detalles'} />
            </Link>
          ))}

          {(memoizedInactiveService && servicesState === 'inactive') && memoizedInactiveService.map(({ id_servicio, foto_servicio, nombre_servicio, resumen_servicio }) => (
            <Link to={`/services/${id_servicio}`} key={id_servicio}>
              <Card src={foto_servicio} title={nombre_servicio} description={resumen_servicio} isButton buttonText={'Detalles'} />
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}

export { AboutUs }
