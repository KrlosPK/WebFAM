import './Navbar.css'

//? Components
import { API_URL, Button, Button2 } from '../../Utils'

//* Libraries
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

//* Hooks
import { Link } from 'react-router-dom'
import { SessionContext } from '../../../context/SessionContext'
import { useContext, useState, useEffect, useRef } from 'react'

//? Icons
import { BiLogOut } from 'react-icons/bi'
import { AiOutlineSetting } from 'react-icons/ai'
import { FaAngleDown } from 'react-icons/fa'
import jwtDecode from 'jwt-decode'

const Navbar = ({ anchordText, linkText, anchordUrl, linkUrl, renderButtons }) => {
  const [expanded, setExpanded] = useState(false)
  const dropdownRef = useRef(null)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const [username, setUsername] = useState(null)
  const [userPhoto, setUserPhoto] = useState(null)

  const getUserId = async () => {
    const cookies = document.cookie
    const tokenCookie = cookies.split('; ').find((cookie) => cookie.startsWith('token='))
    let token = null
    if (!tokenCookie) return null
    token = tokenCookie.split('=')[1]

    const decoded = await jwtDecode(token)

    if (decoded.data) {
      const { data } = decoded
      console.log(decoded)
      setUsername(data[0].nombre)
    } else {
      const { given_name, picture } = decoded
      console.log(decoded)
      setUsername(given_name)
      setUserPhoto(picture)
    }
  }

  useEffect(() => {
    //* Get User name from API
    getUserId()

    if (localStorage.getItem('session') === '') {
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    }

    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  const { setSession, setTempSession } = useContext(SessionContext)

  const logout = () => {
    localStorage.removeItem('session')
    sessionStorage.removeItem('session')
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    setSession(false)
    setTempSession(false)
  }
  return (
    <>
      <nav className='navbar' ref={dropdownRef}>
        <ul className='logo'>
          <Link to='/'>
            <LazyLoadImage src='/logotype-small.png' loading='lazy' width={45} height={45} alt='Logo de Fademet Montajes' />
          </Link>
          <ul className='left'>
            {linkText
              ? linkText.map((el, i) => {
                  return (
                    <li key={i}>
                      <Link id='RouterNavLink' to={linkUrl[i]}>
                        <p className='flex gap fade-gray'>{el}</p>
                      </Link>
                    </li>
                  )
                })
              : ''}
            {anchordText
              ? anchordText.map((el, i) => {
                  return (
                    <li key={i}>
                      <a id='RouterNavLink' href={anchordUrl[i]}>
                        <p className='flex gap fade-gray'>{el}</p>
                      </a>
                    </li>
                  )
                })
              : ''}
          </ul>
        </ul>
        <ul className='right'>
          {renderButtons === 1 && (
            <li className='register-login-buttons'>
              <Link className='flex gap' to='/login'>
                <Button text='Ingresar' width={140} />
              </Link>
              <Link className='flex gap' to='/register'>
                <Button2 text='Registrarse' width={140} />
              </Link>
            </li>
          )}
          {renderButtons === 2 && (
            <>
              <ul className={expanded ? `user show` : 'user'}>
                <li className='user user__container' onClick={handleExpandClick}>
                  <LazyLoadImage loading='lazy' src={userPhoto ? userPhoto : '/default-avatar.png'} width={35} height={35} className='user__image' alt='Profile Pic' />
                  <span className='flex gap user__text'>
                    Perfil
                    <FaAngleDown className='user__icon' />
                  </span>
                </li>
                {expanded && (
                  <>
                    <ul className='user__options'>
                      <li className='options__option'>
                        <LazyLoadImage loading='lazy' src={userPhoto ? userPhoto : '/default-avatar.png'} width={45} height={45} className='user__image' alt='Profile pic' />
                        <strong className='user__name'>{username}</strong>
                      </li>
                      <li className='options__option'>
                        <Link to='edit-user'>
                          <AiOutlineSetting /> Configuración
                        </Link>
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
