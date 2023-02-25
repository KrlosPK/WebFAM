import './ResponsiveNav.css'

//? Components
import { Button, Button2 } from '../'

//* Hooks
import { useState } from 'react'
import { Link } from 'react-router-dom'

const ResponsiveNav = ({ elementText, url }) => {
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
  
  return (
    <div className='menu' onBlur={hideNav}>
      <div className={navClassName}>
        {elementText.map((el, i) => {
          return (
            <Link className='flex gap' to={url[i]} key={i}>
              <span>{el}</span>
            </Link>
          )
        })}
        <Link className='flex gap' to='/login'>
          <Button text='Ingresar' width={120} />
        </Link>
        <Link className='flex gap' to='/register'>
          <Button2 text='Registrarse' width={120} />
        </Link>
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
