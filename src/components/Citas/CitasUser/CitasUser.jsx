import './CitasUser.css'

// ? Components
import { API_URL, Navbar, ResponsiveNav } from '../../Utils'
import { useContext, useEffect, useState } from 'react'
import { SessionContext } from '../../../context/SessionContext'
import { Footer } from '../../Home/Footer/Footer'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
// import { Button } from '@mui/material'

// ? Hooks
// import { useContext, useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'

// ? Context
// import { SessionContext } from '../../context/SessionContext'

// ? Libraries
// import jwtDecode from 'jwt-decode'
// import axios from 'axios'
// import Cookies from 'js-cookie'

const CitasUser = () => {
  const { session } = useContext(SessionContext)

  const [button, setButton] = useState(null)
  const [userDates, setUserDates] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    !session ? setButton(1) : setButton(2)
  }, [])

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      navigate('/login')
      return
    }
    const decoded = jwtDecode(token)
    const { id_usuario } = decoded.data[0]
    axios.get(API_URL(`citasUsuario/${id_usuario}`)).then(({ data }) => {
      const { cita } = data
      setUserDates(cita[0])
      mapSchedule(cita)
    })
  }, [])

  // Mapear todas las citas en una funcion y luego llamarla en el return
  const mapSchedule = (schedule) => {}

  return (
    <>
      <ResponsiveNav
        // linkText={idRol && idRol !== 2 ? ['Inicio', 'Agendas', 'Servicios'] : ['Inicio', 'Servicios', 'Mis Agendas']}
        // linkUrl={idRol && idRol !== 2 ? ['/', '/citas', '/services'] : ['/', '/services', '/mis-citas']}
        linkText={['Inicio', 'Servicios', 'Mis Agendas']}
        linkUrl={['/', '/services', '/mis-citas']}
        renderButtons={button}
      />
      <Navbar
        // linkText={idRol && idRol !== 2 ? ['Inicio', 'Agendas', 'Servicios'] : ['Inicio', 'Servicios', 'Mis Agendas']}
        // linkUrl={idRol && idRol !== 2 ? ['/', '/citas', '/services'] : ['/', '/services', '/mis-citas']}
        linkText={['Inicio', 'Servicios', 'Mis Agendas']}
        linkUrl={['/', '/services', '/mis-citas']}
        renderButtons={button}
      />
      {!userDates && (
        <section className='mis-citas'>
          {' '}
          <h2 className='title__center'>Aún no tienes citas</h2>
        </section>
      )}
      {userDates && (
        <section className='mis-citas'>
          <h2 className='title__center'>Estas son tus citas:</h2>
        </section>
      )}
      <Footer />
    </>
  )
}

export { CitasUser }
