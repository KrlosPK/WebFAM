import './Home.css'

// ? Hooks
import { useState, useEffect, useContext } from 'react'

// ? JSON
import serviceData from '../../json/services.json'

//* Libraries
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import jwtDecode from 'jwt-decode'
import { toast, ToastContainer, Zoom } from 'react-toastify'
import Cookies from 'js-cookie'

//* Components
import { Button, Button2, ResponsiveNav, Navbar } from '../Utils'
import { Team } from './Team/Team'
import { Provide } from './Provide/Provide'
import { FrequentQuestions } from './FrequentQuestions/FrequentQuestions'
import { ServicesSection } from './ServicesSection/ServicesSection'
import { Footer } from './Footer/Footer'

// ? Context
import { ToastifyContext } from '../../context/ToastifyContext'
import { SessionContext } from '../../context/SessionContext'

const Home = () => {
  // ? Context
  const { session } = useContext(SessionContext)
  const { toastify, setToastify } = useContext(ToastifyContext)
  const [idRol, setIdRol] = useState(null)

  useEffect(() => {
    setToastify(false)
  }, [setToastify])

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
    document.title = 'FADEMET Montajes | Inicio'
  }, [])

  useEffect(() => {
    !session ? setButton(1) : setButton(2)
  }, [session])

  const [button, setButton] = useState(null)

  useEffect(() => {
    if (toastify === 'tokenInvalido') {
      toast.error('¡El enlace ha expirado!', {
        theme: 'colored'
      })
    }
  }, [])

  return (
    <>
      <ToastContainer transition={Zoom} limit={3} pauseOnFocusLoss={false} />
      <ResponsiveNav
        linkText={
          idRol && idRol !== 2
            ? ['Inicio', 'Agendas', 'Servicios']
            : !session
              ? ['Inicio', 'Servicios']
              : ['Inicio', 'Servicios', 'Mis Agendas']
        }
        linkUrl={
          idRol && idRol !== 2
            ? ['/', '/citas', '/services']
            : !session
              ? ['/', '/services']
              : ['/', '/services', '/mis-citas']
        }
        anchordText={['Preguntas Frecuentes']}
        anchordUrl={['#preguntasFrecuentes']}
        renderButtons={button}
      />
      <Navbar
        linkText={
          idRol && idRol !== 2
            ? ['Inicio', 'Agendas', 'Servicios']
            : !session
              ? ['Inicio', 'Servicios']
              : ['Inicio', 'Servicios', 'Mis Agendas']
        }
        linkUrl={
          idRol && idRol !== 2
            ? ['/', '/citas', '/services']
            : !session
              ? ['/', '/services']
              : ['/', '/services', '/mis-citas']
        }
        anchordText={['Preguntas Frecuentes']}
        anchordUrl={['#preguntasFrecuentes']}
        renderButtons={button}
      />
      <main className='home-container'>
        <h1>
          SOLDANDO SUEÑOS
          <span>SOLDANDO SUEÑOS</span>
        </h1>
        <p>
          Diseñamos, fabricamos y realizamos el montaje de estructuras metálicas. Impermeabilizamos
          superficies con soluciones asfálticas.
        </p>
        <div className='buttons'>
          <a
            href='https://api.whatsapp.com/send/?phone=573147561960&text=¡Hola!%20Quisiera%20saber%20más%20sobre%20sus%20servicios.&type=phone_number&app_absent=0'
            target={'_blank'}
            rel='noreferrer'
          >
            <Button text='Contáctanos »' width={220} />
          </a>
          <a href='#nuestroEquipo'>
            <Button2 text='⚡ ¿Quiénes somos?' width={220} />
          </a>
        </div>
      </main>
      <section className='services'>
        {serviceData.map(({ id, name, url }) => (
          <div className='service' key={id}>
            <div className='service__image'>
              <LazyLoadImage src={url} effect='blur' loading='lazy' alt={name} />
            </div>
            <div className='service__text'>{name}</div>
          </div>
        ))}
      </section>
      <Provide />
      <Team />
      <ServicesSection />
      <FrequentQuestions />
      <Footer />
    </>
  )
}

export { Home }
