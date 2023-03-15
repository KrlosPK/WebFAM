import './AboutUs.css'
import { API_URL, Card } from '../Utils'

// * Hooks
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const AboutUs = () => {
  const [services, setServices] = useState([])

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
        <div className='cards'>
          {services.map(({ id_servicio, foto_servicio, nombre_servicio, resumen_servicio }) => (
            <Link to={`/services/${id_servicio}`} key={id_servicio}>
              <Card src={foto_servicio} title={nombre_servicio} description={resumen_servicio} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export { AboutUs }
