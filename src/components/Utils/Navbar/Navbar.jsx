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
import axios from 'axios'

const Navbar = ({ anchordText, linkText, anchordUrl, linkUrl, renderButtons }) => {
  const [expanded, setExpanded] = useState(false)
  const dropdownRef = useRef(null)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const [username, setUsername] = useState(null)

  useEffect(() => {
    //* Get User name from API
    axios.get(API_URL(`usuarios/${1}`)).then(({ data }) => {
      const { nombre } = data.user[0]
      setUsername(nombre)
    })

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

  const { setSession } = useContext(SessionContext)

  const logout = () => {
    localStorage.setItem('session', '')
    setSession(false)
  }
  return (
    <>
      <nav className='navbar' ref={dropdownRef}>
        <ul className='logo'>
          <Link to='/'>
            <LazyLoadImage
              src='/logotype-small.png'
              loading='lazy'
              width={45}
              height={45}
              alt='Logo de Fademet Montajes'
            />
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
                  <LazyLoadImage
                    loading='lazy'
                    src='/avatar1.png'
                    width={35}
                    height={35}
                    effect='blur'
                    className='user__image'
                    alt='Imagen de perfil del usuario'
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
                          src='/avatar1.png'
                          width={45}
                          height={45}
                          className='user__image'
                          alt='Imagen de perfil del usuario'
                        />
                        <strong className='user__name'>{username}</strong>
                      </li>
                      <li className='options__option'>
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
