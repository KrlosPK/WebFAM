import './Home.css'

//? Hooks
import { useState, useEffect, useContext } from 'react'
import { ToastifyContext } from '../../context/ToastifyContext'

//? JSON
import serviceData from '../../json/services.json'

//* Libraries
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

//* Components
import { Button, Button2 } from '../Utils'
import { AboutUs } from './AboutUs/AboutUs'
import { Team } from './Team/Team'
import { Provide } from './Provide/Provide'
import { FrequentQuestions } from './FrequentQuestions/FrequentQuestions'

const Home = () => {
  //? Context
  const { setToastify } = useContext(ToastifyContext)

  useEffect(() => {
    setToastify(false)
  }, [setToastify])

  //! Cambiar título de la página
  const [title, setTitle] = useState('FADEMET Montajes | Inicio')
  useEffect(() => {
    document.title = title
  }, [setTitle])

  return (
    <>
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
      <AboutUs />
      <Provide />
      <Team />
      <FrequentQuestions />
    </>
  )
}

export { Home }
