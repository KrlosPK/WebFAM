import './ResponsiveNav.css'

// ? Components
import { Button, Button2 } from '../'

//* Hooks
import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SessionContext } from '../../../context/SessionContext'
import jwtDecode from 'jwt-decode'

// ? Icons
import { AiOutlineSetting } from 'react-icons/ai'
import { BiLogOut } from 'react-icons/bi'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const ResponsiveNav = ({ anchordText, linkText, anchordUrl, linkUrl, renderButtons }) => {
  const [navIsClicked, setNavIsClicked] = useState('clicked')

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

  const { tempSession, setSession, setTempSession } = useContext(SessionContext)

  const logout = () => {
    localStorage.removeItem('session')
    sessionStorage.removeItem('session')
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    setSession(false)
    setTempSession(false)
  }
  useEffect(() => {
    getUserId()
  }, [])

  const [userData, setUserData] = useState({})
  const defaultImage = '/default-avatar.png'

  const getUserId = async () => {
    const cookies = document.cookie
    const tokenCookie = cookies.split('; ').find((cookie) => cookie.startsWith('token='))
    let token = null
    if (!tokenCookie) return null
    token = tokenCookie.split('=')[1]

    const decoded = await jwtDecode(token)

    if (decoded.data) {
      const { data } = decoded
      setUserData({ ...userData, name: data[0].nombre })
    } else {
      const { given_name, picture } = decoded
      setUserData({ ...userData, name: given_name, picture })
    }
  }

  return (
    <div className='menu' onBlur={hideNav}>
      <div className={navClassName}>
        {tempSession && (
          <li className='options__option'>
            <LazyLoadImage
              loading='lazy'
              src={userData.picture || defaultImage}
              width={45}
              height={45}
              className='user__image'
              alt=''
            />
            <strong className='user__name'>{userData.name}</strong>
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
            <Link to='/account'>
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
