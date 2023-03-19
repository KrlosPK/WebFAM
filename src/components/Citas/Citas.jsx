import './Citas.css'

// ? Components
import { Footer } from '../Home/Footer/Footer'
import { getToken, Navbar, ResponsiveNav } from '../Utils'

// ? Hooks
import { useContext, useEffect, useState } from 'react'

// ? Context
import { SessionContext } from '../../context/SessionContext'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const Citas = () => {
  const { session, tempSession } = useContext(SessionContext)

  const [button, setButton] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = getToken()
    if (!token) return navigate('/login')
    const decode = jwtDecode(token)
    const { id_rol } = decode.data[0]
    if (id_rol === 2) return navigate('/')
  }, [])

  useEffect(() => {
    !session ? setButton(1) : setButton(2)
    !tempSession ? setButton(1) : setButton(2)
  }, [])

  // ! Cambiar título de la página
  const [title, setTitle] = useState('FADEMET Montajes | Citas')
  useEffect(() => {
    // ? Scroll to top
    window.scrollTo(0, 0)

    document.title = title
  }, [setTitle])
  return (
    <>
      <ResponsiveNav
        linkText={['Inicio', 'Agendas', 'Servicios']}
        linkUrl={['/', '/citas', '/services']}
        renderButtons={button}
      />
      <Navbar
        linkText={['Inicio', 'Agendas', 'Servicios']}
        linkUrl={['/', '/citas', '/services']}
        renderButtons={button}
      />
      <div className='citas'>
        <h1>Citas</h1>
      </div>
      <Footer />
    </>
  )
}

export { Citas }
