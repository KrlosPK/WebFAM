import './Home.css'

//? Hooks
import { useState, useEffect } from 'react'

//* Components
import { Button, Button2 } from '../Utils'
import { Services } from './Services/Services'
import { AboutUs } from './AboutUs/AboutUs'
import { Team } from './Team/Team'
import { Provide } from './Provide/Provide'
import { FrequentQuestions } from './FrequentQuestions/FrequentQuestions'

const Home = () => {
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
      <Services />
      <AboutUs
        src={[
          '/asesoría.jpg',
          '/diseño.jpg',
          '/fabricación.jpg',
          '/ingeniería.jpg',
          '/reparación.jpg',
          '/trabajo_en_equipo.jpg'
        ]}
        alt={[
          'Empleado de FADEMET Soldando una Escalera de Metal',
          'Puerta de Madera desplegable diseñada por FADEMET',
          'Estructura planificada y ensamblada por FADEMET',
          'Empleado de FADEMET Soldando una Escalera de Metal',
          'Empleado de FADEMET Soldando una Escalera de Metal',
          'Empleado de FADEMET Soldando una Escalera de Metal'
        ]}
        title={[
          'Asesoría',
          'Diseño',
          'Fabricación',
          'Ingeniería',
          'Reparación',
          'Trabajo en Equipo'
        ]}
        description={[
          'Te asesoramos y recomendamos lo mejor para ti',
          'Llevamos tus ideas a la realidad',
          'Elaboramos con amor y dedicación',
          'Planeamos y estructuramos con base en tus necesidades',
          'Puerta hecha Madera',
          'En FADEMET, priorizamos el trabajo en equipo'
        ]}
      />
      <Provide
        src={[
          '/provideDesign.png',
          '/provideFabrication.png',
          '/provideAdvisory.png',
          '/provideRepair.png'
        ]}
        alt={[
          'Servicio que Provee la empresa FADEMET',
          'Servicio que Provee la empresa FADEMET',
          'Servicio que Provee la empresa FADEMET',
          'Servicio que Provee la empresa FADEMET'
        ]}
        header={['Diseño', 'Fabricación', 'Asesoría', 'Reparación']}
        text={[
          'Llevamos tus ideas a la realidad',
          'Elaboramos con amor y dedicación',
          'Te orientamos para que tengas tu hogar de ensueño',
          'Restauramos tus estructuras metálicas'
        ]}
        animation={['flip-left', 'flip-left', 'flip-left', 'flip-left']}
      />
      <Team
        src={[
          '/avatar1.png',
          '/avatar2.png',
          '/avatar3.png',
          '/avatar4.png',
          '/avatar5.png',
          '/avatar6.png',
          '/avatar7.png',
          '/avatar8.png'
        ]}
        alt={[
          'Empleado de FADEMET',
          'Empleado de FADEMET',
          'Empleado de FADEMET',
          'Empleado de FADEMET',
          'Empleado de FADEMET',
          'Empleado de FADEMET',
          'Empleado de FADEMET',
          'Empleado de FADEMET'
        ]}
        header={[
          'Ramiro Urrego',
          'Mauricio Urrego',
          'Dulfari Urrego',
          'Hernán Velásquez',
          'Pedro Arrieta',
          'Juan Zuleta',
          'Danilo Zapata',
          'Karen Gomez'
        ]}
        text={[
          'Director General',
          'Jefe de Operaciones',
          'Soldador',
          'Soldador',
          'Ayudante de Soldadura',
          'Ayudante de Soldadura',
          'Ayudante de Soldadura',
          'Recursos Humanos'
        ]}
        textColor={[
          'var(--icon-color)',
          'var(--icon-color)',
          'var(--icon-color)',
          'var(--icon-color)',
          'var(--icon-color)',
          'var(--icon-color)',
          'var(--icon-color)',
          'var(--icon-color)'
        ]}
        animation={[
          'zoom-in-up',
          'zoom-in-up',
          'zoom-in-up',
          'zoom-in-up',
          'zoom-in-up',
          'zoom-in-up',
          'zoom-in-up',
          'zoom-in-up'
        ]}
        borderRadius={['50%', '50%', '50%', '50%', '50%', '50%', '50%', '50%']}
      />
      <FrequentQuestions />
    </>
  )
}

export { Home }
