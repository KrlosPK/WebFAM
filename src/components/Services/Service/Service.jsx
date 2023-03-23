import './Service.css'

// ? Components
import { API_URL, Button, getToken, ModalService, Navbar, ResponsiveNav } from '../../Utils'
import { Footer } from '../../Home/Footer/Footer'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { toast, ToastContainer, Zoom } from 'react-toastify'

//* Hooks
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

// ? Context
import { SessionContext } from '../../../context/SessionContext'
import { ToastifyContext } from '../../../context/ToastifyContext'

// ? Libraries
import axios from 'axios'
import jwtDecode from 'jwt-decode'

// ? Icons
import { AiOutlineCar } from 'react-icons/ai'
import { GrHostMaintenance } from 'react-icons/gr'
import { BsPatchCheck, BsCalendarEvent } from 'react-icons/bs'

const Service = () => {
  // ? Context
  const { session, tempSession } = useContext(SessionContext)
  const { toastify } = useContext(ToastifyContext)

  const [button, setButton] = useState(null)
  const [idRol, setIdRol] = useState(null)

  // ? Date
  const date = new Date()
  const freeCancelDay = date.getDate() + 1
  const freeCancelDate = date.toLocaleString('default', { month: 'long' })

  const [service, setService] = useState({})

  const { serviceId } = useParams()

  useEffect(() => {
    if (toastify === 'serviceModified') {
      toast.success('¡Servicio modificado con éxito!', {
        theme: 'colored'
      })
    }
  }, [toastify])

  useEffect(() => {
    const token = getToken()

    if (token === null) return

    new Promise((resolve, reject) => {
      const decoded = jwtDecode(token)
      resolve(decoded.data)
      reject(new Error('Error al decodificar el token'))
    }).then((decoded) => {
      setIdRol(decoded[0].id_rol)
    })
  }, [])

  const navigate = useNavigate()

  useEffect(() => {
    // ? Fetch serivice data
    axios
      .get(API_URL(`servicios/${serviceId}`))
      .then(({ data }) => {
        setService(data.service)
      })
      .catch(() => {
        navigate('/404', { replace: true })
      })

    // ? Scroll to top
    window.scrollTo(0, 0)

    if (!session || !tempSession) {
      setButton(1)
    } else {
      setButton(2)
    }
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

  // ? Close fullscreen with escape key
  useEffect(() => {
    const closeFullscreen = (e) => {
      if (e.key === 'Escape') {
        const overlay = document.querySelector('.overlay')
        if (overlay) {
          overlay.remove()
          document.body.style.overflow = 'auto'
        }
      }
    }
    window.addEventListener('keydown', closeFullscreen)
    return () => window.removeEventListener('keydown', closeFullscreen)
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
      <section className='service-info'>
        <div>
          <LazyLoadImage
            src={service[0] && service[0].foto_servicio}
            loading='lazy'
            width={500}
            height={500}
            className='service-info__img'
            alt='Servicio que ofrece Fademet Montajes'
            style={{ background: 'transparent' }}
          />
          <aside className='service-aside'>
            <h2 className='service-aside__title'>{service[0] && service[0].nombre_servicio}</h2>
            <p className='service-aside__desc'>{service[0] && service[0].descripcion_servicio}</p>
            <div className='aside__modal-service'>
              <ModalService
                nombre_servicio={service[0] && service[0].nombre_servicio}
                id_servicio={service[0] && service[0].id_servicio}
              />
              {idRol && idRol !== 2 && (
                <Link to={`/edit-service/${serviceId}`}>
                  <Button text={'Editar servicio'} height={'41px'} width={'220px'}/>
                </Link>
              )}
            </div>
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
          <>
            <h3 className='gallery__title'>Galería</h3>
            <figure className='service-info__gallery'>
              {service[0].galeria_servicios.split(', ').map((img, i) => (
                <LazyLoadImage
                  key={i}
                  src={img}
                  loading='lazy'
                  effect='blur'
                  width={350}
                  height={350}
                  alt='Servicio que ofrece Fademet Montajes'
                  style={{ background: 'transparent' }}
                  onClick={fullscreen}
                />
              ))}
            </figure>
          </>
        )}
      </section>
      <Footer />
    </>
  )
}

export { Service }
