import './ResponsiveNav.css'

//? Components
import { Button, Button2 } from '../'

//* Hooks
import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SessionContext } from '../../../context/SessionContext'
import jwtDecode from 'jwt-decode'

//? Icons
import { AiOutlineSetting } from 'react-icons/ai'
import { BiLogOut } from 'react-icons/bi'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const ResponsiveNav = ({ anchordText, linkText, anchordUrl, linkUrl, renderButtons }) => {
  const [navIsClicked, setNavIsClicked] = useState('')

  let navClassName = 'navigation'

  navClassName += navIsClicked === 'clicked' ? ' close-menu' : ''

  const [buttonIsClicked, setButtonIsClicked] = useState('')

  let buttonClassName = 'menu__button'
  buttonClassName += buttonIsClicked === 'clicked' ? ' hover' : ''

  const handleClick = () => {
    navIsClicked ? setNavIsClicked('') : setNavIsClicked('clicked')

    buttonIsClicked ? setButtonIsClicked('') : setButtonIsClicked('clicked')
  }

  const hideNav = () => {
    setNavIsClicked('clicked')
    setButtonIsClicked('')
  }

  const { session, setSession } = useContext(SessionContext)

  const logout = () => {
    localStorage.setItem('session', '')
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    setSession(false)
  }
  useEffect(() => {
    getUserId()
  }, [])

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
      setUsername(data[0].nombre)
    } else {
      const { given_name, picture } = decoded
      setUsername(given_name)
      setUserPhoto(picture)
    }
  }

  return (
    <div className='menu' onBlur={hideNav}>
      <div className={navClassName}>
        {session && (
        <li className='options__option'>
          <LazyLoadImage
            loading='lazy'
            src={userPhoto ? userPhoto : '/default-avatar.png'}
            width={45}
            height={45}
            className='user__image'
            alt='Imagen de perfil del usuario'
          />
          <strong className='user__name'>{username}</strong>
        </li>
        )}
        {linkText.map((el, i) => {
          return (
            <Link className='flex' to={linkUrl[i]} key={i}>
              <span>{el}</span>
            </Link>
          )
        })}
        {anchordText.map((el, i) => {
          return (
            <a className='flex' href={anchordUrl[i]} key={i}>
              <span>{el}</span>
            </a>
          )
        })}
        {renderButtons === 1 && (
          <>
            <Link className='flex' to='/login'>
              <Button text='Ingresar' width={140} />
            </Link>
            <Link className='flex' to='/register'>
              <Button2 text='Registrarse' width={140} />
            </Link>
          </>
        )}
        {renderButtons === 2 && (
          <div className='logout'>
            <Link to='/edit-user'>
              <AiOutlineSetting /> Configuración
            </Link>
            <Link to='/' onClick={logout}>
              <BiLogOut /> Cerrar sesión
            </Link>
          </div>
        )}
      </div>
      <button className={buttonClassName} onClick={handleClick}>
        <div></div>
        <div></div>
        <div></div>
      </button>
    </div>
  )
}

export { ResponsiveNav }
