import './Navbar.css'

// ? Components
import { Button, Button2 } from '../../Utils'
import { NavLink } from '../../NavLink'

//* Libraries
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import jwtDecode from 'jwt-decode'

//* Hooks
import { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

// ? Context
import { SessionContext } from '../../../context/SessionContext'

// ? Icons
import { BiLogOut } from 'react-icons/bi'
import { AiOutlineSetting, AiOutlineUser } from 'react-icons/ai'
import { FaAngleDown } from 'react-icons/fa'

const Navbar = ({ anchordText, linkText, anchordUrl, linkUrl, renderButtons }) => {
  const { setSession } = useContext(SessionContext)

  const [expanded, setExpanded] = useState(false)
  const dropdownRef = useRef(null)

  const navigate = useNavigate()

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const [userData, setUserData] = useState({})
  const defaultImage = '/default-avatar.png'

  const getUserData = async () => {
    const token = Cookies.get('token')

    if (!token) return

    const decoded = await jwtDecode(token)

    if (decoded.data) {
      const { data } = decoded
      setUserData({
        ...userData,
        name: data[0].nombre,
        id_rol: data[0].id_rol,
        picture: data[0].foto_perfil
      })
    }
  }

  useEffect(() => {
    //* Get User name from API
    getUserData()

    function handleClickOutside (event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  useEffect(() => {
    const cookie = Cookies.get('token')
    if (cookie) {
      setSession(true)
    } else {
      setSession(false)
      const domain = window.location.hostname
      Cookies.remove('token', { path: '', domain })
    }
  }, [])

  const logout = () => {
    const domain = window.location.hostname
    Cookies.remove('session', { domain, path: '' })
    Cookies.remove('token', { domain, path: '' })
    setSession(false)
    navigate('/')
  }

  const account = () => {
    navigate('/account')
  }

  const allUsers = () => {
    navigate('/all-users')
  }

  return (
    <>
      <nav className='navbar' ref={dropdownRef}>
        <ul className='logo'>
          <NavLink to='/'>
            <LazyLoadImage
              src='/logotype-small.png'
              loading='lazy'
              effect='blur'
              width={45}
              height={45}
              alt='Logo de Fademet Montajes'
            />
            <b className='logo__text'>
              FADE<span className='logo__text-span'>MET</span>
            </b>
          </NavLink>
          <ul className='left'>
            {linkText &&
              linkText.map((el, i) => {
                return (
                  <li key={i}>
                    <NavLink id='RouterNavLink' to={linkUrl[i]}>
                      <p className='flex gap fade-gray'>{el}</p>
                    </NavLink>
                  </li>
                )
              })}
            {anchordText &&
              anchordText.map((el, i) => {
                return (
                  <li key={i}>
                    <a id='RouterNavLink' href={anchordUrl[i]}>
                      <p className='flex gap fade-gray'>{el}</p>
                    </a>
                  </li>
                )
              })}
          </ul>
        </ul>
        <ul className='right'>
          {renderButtons === 1 && (
            <li className='register-login-buttons'>
              <NavLink className='flex gap' to='/login'>
                <Button text='Ingresar' width={140} />
              </NavLink>
              <NavLink className='flex gap' to='/register'>
                <Button2 text='Registrarse' width={140} />
              </NavLink>
            </li>
          )}
          {renderButtons === 2 && (
            <>
              <ul className={expanded ? 'user show' : 'user'}>
                <li className='user user__container' onClick={handleExpandClick}>
                  <LazyLoadImage
                    loading='lazy'
                    effect='blur'
                    src={userData.picture || defaultImage}
                    width={35}
                    height={35}
                    className='user__image'
                    alt={`Foto de Perfil de ${userData.name}}`}
                  />
                  <span className='flex gap user__text'>
                    Perfil
                    <FaAngleDown className='user__icon' />
                  </span>
                </li>
                {expanded && (
                  <>
                    <ul className='user__options'>
                      <li className='options__option'>
                        <LazyLoadImage
                          loading='lazy'
                          effect='blur'
                          src={userData.picture || defaultImage}
                          width={45}
                          height={45}
                          className='user__image'
                          alt={`Foto de Perfil de ${userData.name}}`}
                        />
                        <strong className='user__name'>{userData.name}</strong>
                      </li>
                      {userData.id_rol !== 2 && (
                        <li className='options__option see-users' onClick={allUsers}>
                          <AiOutlineUser /> <span id='see-all-users'>Usuarios</span>
                        </li>
                      )}
                      <li className='options__option' onClick={account}>
                        <AiOutlineSetting /> Configuración
                      </li>
                      <li className='options__option' onClick={logout}>
                        <BiLogOut />
                        Cerrar sesión
                      </li>
                    </ul>
                  </>
                )}
              </ul>
            </>
          )}
        </ul>
      </nav>
      <div className='wrapper'></div>
    </>
  )
}

export { Navbar }
