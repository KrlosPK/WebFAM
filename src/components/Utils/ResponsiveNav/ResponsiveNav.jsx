import './ResponsiveNav.css'

//? Components
import { Button, Button2 } from '../'

//* Hooks
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext'
import { useContext } from 'react'

//? Icons
import { BiLogOut } from 'react-icons/bi'

const ResponsiveNav = ({ elementText, url, renderButtons }) => {
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

  const logout = () => {
    const { setSession } = useContext(UserContext)
    setSession(false)
  }

  return (
    <div className='menu' onBlur={hideNav}>
      <div className={navClassName}>
        {elementText.map((el, i) => {
          return (
            <Link className='flex' to={url[i]} key={i}>
              <span>{el}</span>
            </Link>
          )
        })}
        {renderButtons === 1 ? (
          <>
            <Link className='flex' to='/login'>
              <Button text='Ingresar' width={120} />
            </Link>
            <Link className='flex' to='/register'>
              <Button2 text='Registrarse' width={120} />
            </Link>
          </>
        ) : renderButtons === 2 ? (
          <div className='logout'>
            <Link onClick={logout}>
              Cerrar sesión <BiLogOut />
            </Link>
          </div>
        ) : (
          ''
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
