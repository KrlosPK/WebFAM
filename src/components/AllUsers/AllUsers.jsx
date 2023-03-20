// * Hooks
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { SessionContext } from '../../context/SessionContext'

// * Libs
import jwtDecode from 'jwt-decode'

// * Utils
import { getToken, Navbar, ResponsiveNav } from '../Utils'

// * Styles
import './AllUsers.css'

const AllUsers = () => {
  // ? Context
  const { session, tempSession } = useContext(SessionContext)

  // * States
  const [button, setButton] = useState(null)

  useEffect(() => {
    !session ? setButton(1) : setButton(2)
    !tempSession ? setButton(1) : setButton(2)
  }, [])

  // * Cambiar título de la página
  const [title, setTitle] = useState('FADEMET Montajes | Ver todos los usuarios')
  useEffect(() => {
    // ? Scroll to top
    window.scrollTo(0, 0)
    document.title = title
  }, [setTitle])

  // * Navigate
  const navigate = useNavigate()

  // * Validate if user is admin
  useEffect(async () => {
    const token = getToken()
    if (token === null) {
      navigate('/login')
      return null
    }
    const decode = await jwtDecode(token)
    const { id_rol } = decode.data[0]
    if (id_rol === 2) navigate('/')
  }, [])

  return (
    <>
      <ResponsiveNav
        linkText={['Inicio', 'Servicios']}
        linkUrl={['/', '/services']}
        renderButtons={button}
      />
      <Navbar
        linkText={['Inicio', 'Servicios']}
        linkUrl={['/', '/services']}
        renderButtons={button}
      />
    </>
  )
}

export { AllUsers }
