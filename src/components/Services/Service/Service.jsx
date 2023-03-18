import './Service.css'

// ? Components
import { API_URL, Button2, Navbar, ResponsiveNav } from '../../Utils'
import { Footer } from '../../Home/Footer/Footer'
import { LazyLoadImage } from 'react-lazy-load-image-component'

//* Hooks
import { useContext, useEffect, useState } from 'react'
import { SessionContext } from '../../../context/SessionContext'
import { useParams } from 'react-router-dom'
import axios from 'axios'

// ? Icons
import { AiOutlineCar } from 'react-icons/ai'
import { GrHostMaintenance } from 'react-icons/gr'
import { BsPatchCheck, BsCalendarEvent } from 'react-icons/bs'

const Service = () => {
  // ? Context
  const { session, tempSession } = useContext(SessionContext)

  const [button, setButton] = useState(null)

  // ? Date
  const date = new Date()
  const freeCancelDay = date.getDate() + 1
  const freeCancelDate = date.toLocaleString('default', { month: 'long' })

  const [service, setService] = useState({})

  const { serviceId } = useParams()
  useEffect(() => {
    // ? Fetch serivice data
    axios.get(API_URL(`servicios/${serviceId}`)).then(({ data }) => {
      setService(data.service)
    })

    // ? Scroll to top
    window.scrollTo(0, 0)

    !session ? setButton(1) : setButton(2)
    !tempSession ? setButton(1) : setButton(2)
  }, [session, tempSession])

  const fullscreen = (e) => {
    document.body.style.overflow = 'hidden'
    const img = e.target
    const overlay = document.createElement('div')
    overlay.classList.add('overlay')
    overlay.appendChild(img.cloneNode())
    overlay.addEventListener('click', () => {
      overlay.remove()
      document.body.style.overflow = 'auto'
    })
    document.body.appendChild(overlay)
  }

  return (
    <>
      <ResponsiveNav
        linkText={['Inicio', 'Servicios']}
        linkUrl={['/', '/services']}
        renderButtons={button}
      />
      <Navbar
        linkText={['Inicio', 'Servicios']}
        linkUrl={['/', '/services']}
        renderButtons={button}
      />
      <section className='service-info'>
        <div>
          <LazyLoadImage
            src={service[0] && service[0].foto_servicio}
            loading='lazy'
            width={500}
            height={500}
            alt='Servicio que ofrece Fademet Montajes'
            style={{ background: 'transparent' }}
          />
          <aside className='service-aside'>
            <h2 className='service-aside__title'>{service[0] && service[0].nombre_servicio}</h2>
            <p className='service-aside__desc'>{service[0] && service[0].descripcion_servicio}</p>
            <Button2 text='Solicitar' width={210} />
          </aside>
        </div>
        <article className='service-info__description'>
          <h2 className='description__title'>Lo que este servicio ofrece</h2>
          <div className='offers'>
            <div className='offers__item'>
              <AiOutlineCar />
              <p>Despacho a domicilio</p>
            </div>
            <div className='offers__item'>
              <GrHostMaintenance />
              <p>Mantenimiento</p>
            </div>
            <div className='offers__item'>
              <BsPatchCheck />
              <p>Garantía</p>
            </div>
            <div className='offers__item'>
              <BsCalendarEvent />
              <p>
                Cancelación gratuita antes del {freeCancelDay} de {freeCancelDate}.
              </p>
            </div>
          </div>
        </article>
        {service[0] && service[0].galeria_servicios && (
          <figure className='service-info__gallery'>
            {service[0].galeria_servicios.split(', ').map((img, i) => (
              <LazyLoadImage
                key={i}
                src={img}
                loading='lazy'
                width={380}
                alt='Servicio que ofrece Fademet Montajes'
                style={{ background: 'transparent' }}
                onClick={fullscreen}
              />
            ))}
          </figure>
        )}
      </section>

      {/* {serviceId.map(({ id, src, alt, title, description }) => (
        <Card key={id} src={src} alt={alt} title={title} description={description} />
      ))} */}
      <Footer />
    </>
  )
}

export { Service }
