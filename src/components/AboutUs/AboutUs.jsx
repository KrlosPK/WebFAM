import './AboutUs.css'

// ? Components
import { API_URL, Button2, Card } from '../Utils'
import { Link } from 'react-router-dom'

// * Hooks
import { useEffect, useState } from 'react'

// ? Libraries
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'

const AboutUs = () => {
  const [services, setServices] = useState(null)
  const [idRol, setIdRol] = useState(null)

  useEffect(() => {
    const token = Cookies.get('token')

    if (!token) return

    if (token !== null) {
      const decode = jwtDecode(token)
      setIdRol(decode.data[0].id_rol)
    }
  }, [])

  useEffect(() => {
    axios.get(API_URL('servicios')).then(({ data }) => {
      setServices(data.services)
    })
  }, [])
  return (
    <section className='about-us-container'>
      <div className='info'>
        <h2 className='info__title'>¡Ofrecemos los mejores servicios para nuestros clientes!</h2>
        <p className='info__subtitle'>
          En FADEMET valoramos tus deseos, por lo que trabajamos arduamente día a día para ofrecerte
          servicios que se adapten a tus necesidades y sean de la más alta calidad.
        </p>
        {idRol && idRol !== 2 && (
          <Link to='/add-service'>
            <Button2 text={'Crear servicio'} />
          </Link>
        )}
        <div className='cards'>
          {services
            ? (
              services.map(({ id_servicio, foto_servicio, nombre_servicio, resumen_servicio }) => (
                <Link to={`/services/${id_servicio}`} key={id_servicio}>
                  <Card src={foto_servicio} title={nombre_servicio} description={resumen_servicio} isButton buttonText={'Detalles'} />
                </Link>
              ))
            )
            : (
              <div className='loader'>Cargando...</div>
            )}
        </div>
      </div>
    </section>
  )
}

export { AboutUs }
