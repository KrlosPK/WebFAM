import './CitasUser.css'

// ? Components
import { API_URL, /* LongCard, */ Navbar, ResponsiveNav } from '../../Utils'
import { useContext, useEffect, useState } from 'react'
import { SessionContext } from '../../../context/SessionContext'
import { Footer } from '../../Home/Footer/Footer'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import { Button } from '@mui/material'
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
  const [datesState, setDatesState] = useState('pendientes')

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
    axios
      .get(API_URL(`citasUsuario/${id_usuario}`))
      .then(({ data }) => {
        const { cita } = data
        console.log(cita)
        setUserDates(cita[0])
        // mapSchedule(cita)
      })
      .catch(() => {
        setUserDates(null)
        throw new Error('ERROR_GET_SCHEDULES')
      })
  }, [])

  // Mapear todas las citas en una funcion y luego llamarla en el return
  // const mapSchedule = (schedule) => {

  // }

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
      {/* {!userDates && (
        <section className='mis-citas'>
          <h2 className='title__center'>Aún no tienes citas</h2>
        </section>
      )} */}
      <section>
        <nav className='citas-nav'>
          <ul className='citas-nav__ul'>
            <Button
              variant='text'
              className={datesState === 'pendientes' ? 'cita-active' : ''}
              onClick={() => setDatesState('pendientes')}
              color='inherit'
              sx={{ fontFamily: 'Syne' }}
            >
              Pendientes
            </Button>
            <Button
              variant='text'
              className={datesState === 'respondidas' ? 'cita-active' : ''}
              onClick={() => setDatesState('respondidas')}
              color='inherit'
              sx={{ fontFamily: 'Syne' }}
            >
              Respondidas
            </Button>
          </ul>
        </nav>
        {userDates
          ? (
            <section className='mis-citas'>
              <h1 className='title__center'>Estas son tus citas:</h1>
              {/* <LongCard  /> */}
            </section>
          )
          : (
            <section className='mis-citas'>
              <h1 className='title__center'>Aún no tienes citas</h1>
            </section>
          )}
        <Footer />
      </section>
    </>
  )
}

export { CitasUser }
