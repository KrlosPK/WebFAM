import './ResponsiveNav.css'

//? Components
import { Button, Button2 } from '../'

//* Hooks
import { useState } from 'react'
import { Link } from 'react-router-dom'

const ResponsiveNav = ({ elementText, url, renderButtons = false }) => {
  const [navIsClicked, setNavIsClicked] = useState('')

  let navClassName = 'navigation'

  navClassName += navIsClicked === 'clicked' ? ' close-menu' : ''

  const [buttonIsClicked, setButtonIsClicked] = useState('clicked')

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
        {renderButtons ? (
          <>
            <Link className='flex' to='/login'>
              <Button text='Ingresar' width={120} />
            </Link>
            <Link className='flex' to='/register'>
              <Button2 text='Registrarse' width={120} />
            </Link>
          </>
        ) : (
          <></>
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
