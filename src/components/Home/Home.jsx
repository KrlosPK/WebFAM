import './Home.css'

// ? Hooks
import { useState, useEffect, useContext } from 'react'
import { ToastifyContext } from '../../context/ToastifyContext'

// ? JSON
import serviceData from '../../json/services.json'

//* Libraries
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

//* Components
import { Button, Button2, ResponsiveNav, Navbar, getToken } from '../Utils'
import { Team } from './Team/Team'
import { Provide } from './Provide/Provide'
import { FrequentQuestions } from './FrequentQuestions/FrequentQuestions'
import { ServicesSection } from './ServicesSection/ServicesSection'
import { Footer } from './Footer/Footer'
import { SessionContext } from '../../context/SessionContext'
import jwtDecode from 'jwt-decode'

const Home = () => {
  // ? Context
  const { session, tempSession } = useContext(SessionContext)
  const { setToastify } = useContext(ToastifyContext)
  const [idUsuario, setIdUsuario] = useState(null)

  useEffect(() => {
    setToastify(false)
  }, [setToastify])

  useEffect(() => {
    const token = getToken()

    if (!token) return

    new Promise((resolve, reject) => {
      const decoded = jwtDecode(token)
      resolve(decoded.data)
      reject(new Error('Error al decodificar el token'))
    }).then((decoded) => {
      setIdUsuario(decoded[0].id_usuario)
    })
  }, [])

  // ! Cambiar título de la página
  const [title, setTitle] = useState('FADEMET Montajes | Inicio')
  useEffect(() => {
    document.title = title
  }, [setTitle])

  const [button, setButton] = useState(null)

  useEffect(() => {
    !session ? setButton(1) : setButton(2)
    !tempSession ? setButton(1) : setButton(2)
  }, [session, tempSession])

  return (
    <>
      <ResponsiveNav
        linkText={idUsuario ? idUsuario !== 2 ? ['Inicio', 'Agendas', 'Servicios'] : ['Inicio', 'Servicios'] : ['Inicio', 'Servicios']}
        linkUrl={idUsuario ? idUsuario !== 2 ? ['/', '/citas', '/services'] : ['/', '/services'] : ['/', '/services']}
        anchordText={['Preguntas Frecuentes']}
        anchordUrl={['#preguntasFrecuentes']}
        renderButtons={button}
      />
      <Navbar
        linkText={idUsuario ? idUsuario !== 2 ? ['Inicio', 'Agendas', 'Servicios'] : ['Inicio', 'Servicios'] : ['Inicio', 'Servicios']}
        linkUrl={idUsuario ? idUsuario !== 2 ? ['/', '/citas', '/services'] : ['/', '/services'] : ['/', '/services']}
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
            target={'_blank'} rel="noreferrer"
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
