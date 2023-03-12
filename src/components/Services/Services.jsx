import './Services.css'

// ? Components
import { Navbar, ResponsiveNav } from '../Utils'

//* Hooks
import { useContext, useEffect, useState } from 'react'
import { SessionContext } from '../../context/SessionContext'

const Services = () => {
  // ? Context
  const { session, tempSession } = useContext(SessionContext)

  const [button, setButton] = useState(null)

  useEffect(() => {
    !session ? setButton(1) : setButton(2)
    !tempSession ? setButton(1) : setButton(2)
  }, [session, tempSession])

  // ! Cambiar título de la página
  const [title, setTitle] = useState('FADEMET Montajes | Servicios')
  useEffect(() => {
    document.title = title
  }, [setTitle])
  return (
    <>
      <ResponsiveNav
        linkText={['Inicio', 'Agendar', 'Servicios']}
        linkUrl={['/', '/', '/services']}
        anchordText={['Preguntas Frecuentes']}
        anchordUrl={['#preguntasFrecuentes']}
        renderButtons={button}
      />
      <Navbar
        linkText={['Inicio', 'Agendar', 'Servicios']}
        linkUrl={['/', '/', '/services']}
        renderButtons={button}
      />
      <section className='servicios'>
        <h1>Servicios</h1>
        <div className="servicios__card"></div>
      </section>
    </>
  )
}

export { Services }
