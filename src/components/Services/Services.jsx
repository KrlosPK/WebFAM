import './Services.css'

// ? Components
import { Navbar, ResponsiveNav } from '../Utils'
import { Footer } from '../Home/Footer/Footer'
import { AboutUs } from '../AboutUs/AboutUs'

//* Hooks
import { useContext, useEffect, useState } from 'react'
import { SessionContext } from '../../context/SessionContext'
// import { useParams } from 'react-router-dom'

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

  // const { serviceId } = useParams()

  const redirectService = () => {
    console.log('hola')
  }

  return (
    <>
      <ResponsiveNav
        linkText={['Inicio', 'Agendar', 'Servicios']}
        linkUrl={['/', '/', '/services']}
        renderButtons={button}
      />
      <Navbar
        linkText={['Inicio', 'Agendar', 'Servicios']}
        linkUrl={['/', '/', '/services']}
        renderButtons={button}
      />
      <AboutUs innerOnClick={redirectService} />
      <Footer />
    </>
  )
}

export { Services }
