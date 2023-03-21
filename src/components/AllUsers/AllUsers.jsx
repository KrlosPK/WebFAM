// * Hooks
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// * Context
import { SessionContext } from '../../context/SessionContext'

// * Components
import { Footer } from '../Home/Footer/Footer'

// * Libs
import jwtDecode from 'jwt-decode'
import axios from 'axios'

// * Utils
import { API_URL, Button2, getToken, MiniCard, Navbar, ResponsiveNav } from '../Utils'

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
  const [title, setTitle] = useState('FADEMET Montajes | Usuarios')
  useEffect(() => {
    // ? Scroll to top
    window.scrollTo(0, 0)
    document.title = title
  }, [setTitle])

  const navigate = useNavigate()

  useEffect(() => {
    const token = getToken()
    if (!token) return navigate('/')
    const decode = jwtDecode(token)
    const { id_rol } = decode.data[0]
    if (id_rol === 2) return navigate('/')
  }, [])

  // ? Get users
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios
      .get(API_URL('usuarios'))
      .then(({ data }) => {
        setUsers(data.users)
      })
      .catch(() => {
        setUsers([])
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
      <main className='team'>
        <h1 className='team__title'>Usuarios</h1>
        <div className='colleagues'>
          {users.map(({ id_usuario, foto_perfil, nombre, correo }) => (
            <div className='colleague' key={id_usuario}>
              <MiniCard
                src={foto_perfil}
                alt={`foto de perfil de ${nombre}`}
                header={`${id_usuario}. ${nombre}`}
                text={correo}
                textColor='orange'
              />
              <div className="colleague__button-edit">
                <Link to={`/info-user-edit/${id_usuario}`}>
                  <Button2 key={id_usuario} text='Editar' width={150}/>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}

export { AllUsers }
