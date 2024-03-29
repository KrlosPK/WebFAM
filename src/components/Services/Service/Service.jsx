import './Service.css'

// ? Components
import { API_URL, Button, ModalService, Navbar, ResponsiveNav } from '../../Utils'
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
import Cookies from 'js-cookie'

// ? Icons
import { AiOutlineCar } from 'react-icons/ai'
import { GrHostMaintenance } from 'react-icons/gr'
import { BsPatchCheck, BsCalendarEvent } from 'react-icons/bs'

const Service = () => {
  // ? Context
  const { session } = useContext(SessionContext)
  const { toastify, setToastify } = useContext(ToastifyContext)

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

  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(API_URL(`servicios/${serviceId}`))
      .then(({ data }) => {
        setService(data.service)
      })
      .catch(() => {
        navigate('/404', { replace: true })
      })

    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    !session ? setButton(1) : setButton(2)
  }, [])

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
      <section className='service-info'>
        <div>
          <LazyLoadImage
            src={service[0] && service[0].foto_servicio}
            loading='lazy'
            effect='blur'
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
                  <Button text={'Editar servicio'} height={41} width={220} />
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
        {(service[0] && (service[0].galeria_servicios !== '0')) && (
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
