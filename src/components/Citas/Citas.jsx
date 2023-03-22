import './Citas.css'

// ? Components
import { Footer } from '../Home/Footer/Footer'
import { API_URL, getToken, MiniCard, Navbar, ResponsiveNav } from '../Utils'
import { Button } from '@mui/material'

// ? Hooks
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ? Context
import { SessionContext } from '../../context/SessionContext'

// ? Libraries
import jwtDecode from 'jwt-decode'
import axios from 'axios'

const Citas = () => {
  const { session, tempSession } = useContext(SessionContext)

  const [button, setButton] = useState(null)
  const navigate = useNavigate()

  const [citasData, setCitasData] = useState([])
  const [dates, setDates] = useState('pendientes')

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

  useEffect(() => {
    axios
      .get(API_URL('citas'))
      .then(({ data }) => {
        const { citas } = data
        setCitasData(citas)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

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
      <section className='citas'>
        <nav className='citas-nav'>
          <ul className='citas-nav__ul'>
            <Button variant='outlined' onClick={() => setDates('pendientes')} color='warning'>
              Pendientes
            </Button>
            <Button variant='outlined' onClick={() => setDates('respondidas')} color='warning'>
              Respondidas
            </Button>
          </ul>
        </nav>
        {dates === 'pendientes' &&
          citasData.map((el) => {
            return (
              <article key={el.id_cita} className='cita'>
                <MiniCard
                  src='/default-avatar.png'
                  alt='prueba'
                  header={el.direccion}
                  text={`Fecha de Creación: ${el.fecha_creacion.substring(0, 10)}`}
                />
              </article>
            )
          })}
        {dates === 'respondidas' &&
          citasData.map((el) => {
            return (
              <article key={el.id_cita} className='cita'>
                <MiniCard
                  src='/default-avatar.png'
                  alt='prueba'
                  header={el.direccion}
                  text={`Fecha de Creación: ${el.fecha_creacion.substring(0, 10)}`}
                />
              </article>
            )
          })}
      </section>
      <Footer />
    </>
  )
}

export { Citas }
