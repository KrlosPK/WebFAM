import './ResponsiveNav.css'

//? Components
import { Button, Button2 } from '../'

//* Hooks
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { SessionContext } from '../../../context/SessionContext'

//? Icons
import { BiLogOut } from 'react-icons/bi'

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

  const { setSession } = useContext(SessionContext)

  const logout = () => {
    setSession(false)
  }

  return (
    <div className='menu' onBlur={hideNav}>
      <div className={navClassName}>
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
            <Link onClick={logout}>
              Cerrar sesión <BiLogOut />
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
