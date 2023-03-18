// ? Components
import { getToken, Navbar, ResponsiveNav } from '../Utils'
import { Footer } from '../Home/Footer/Footer'
import { AboutUs } from '../AboutUs/AboutUs'

//* Hooks
import { useContext, useEffect, useState } from 'react'
import { SessionContext } from '../../context/SessionContext'
import jwtDecode from 'jwt-decode'

const Services = () => {
  // ? Context
  const { session, tempSession } = useContext(SessionContext)

  const [button, setButton] = useState(null)
  const [idUsuario, setIdUsuario] = useState(null)

  useEffect(() => {
    !session ? setButton(1) : setButton(2)
    !tempSession ? setButton(1) : setButton(2)
  }, [session, tempSession])

  // ! Cambiar título de la página
  const [title, setTitle] = useState('FADEMET Montajes | Servicios')

  useEffect(() => {
    const token = getToken()

    new Promise((resolve, reject) => {
      const decoded = jwtDecode(token)
      resolve(decoded.data)
      reject(new Error('Error al decodificar el token'))
    }).then((decoded) => {
      setIdUsuario(decoded[0].id_usuario)
    })
  }, [])
  useEffect(() => {
    // ? Scroll to top
    window.scrollTo(0, 0)

    document.title = title
  }, [setTitle])

  return (
    <>
      <ResponsiveNav
        linkText={idUsuario !== 2 ? ['Inicio', 'Agendas', 'Servicios'] : ['Inicio', 'Servicios']}
        linkUrl={idUsuario !== 2 ? ['/', '/citas', '/services'] : ['/', '/services']}
        renderButtons={button}
      />
      <Navbar
        linkText={idUsuario !== 2 ? ['Inicio', 'Agendas', 'Servicios'] : ['Inicio', 'Servicios']}
        linkUrl={idUsuario !== 2 ? ['/', '/citas', '/services'] : ['/', '/services']}
        renderButtons={button}
      />
      <AboutUs />
      <Footer />
    </>
  )
}

export { Services }
