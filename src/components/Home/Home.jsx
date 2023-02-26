import './Home.css'

//? Hooks
import { useState, useEffect } from 'react'

//* Components
import { Button, Button2 } from '../Utils'
import { Services } from './Services/Services'
import { AboutUs } from './AboutUs/AboutUs'
import { Team } from './Team/Team'

const Home = () => {
  //! Cambiar título de la página
  const [title, setTitle] = useState('WebFAM - Inicio')
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
          <Button text='Contáctanos »' width={200} />
          <Button2 text='⚡ ¿Quiénes somos?' width={200} />
        </div>
      </main>
      <Services />
      <AboutUs />
      <Team />
    </>
  )
}

export { Home }
