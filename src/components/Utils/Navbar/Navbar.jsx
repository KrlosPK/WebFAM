import './Navbar.css'

//? Components
import { Button, Button2 } from '../../Utils'

//* Hooks
import { Link } from 'react-router-dom'

const Navbar = ({ elementTextLeft, urlLeft, elementTextRight, urlRight }) => {
  return (
    <>
      <nav>
        <ul className='left'>
          {elementTextLeft.map((el, i) => {
            return (
              <li key={i}>
                <Link id='RouterNavLink' to={urlLeft[i]}>
                  <span href='' className='flex gap fade-gray'>
                    {el}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
        <ul className='logo'>
          <img src='/WebFAM_logo.png' width={120} alt='WebFAM logo' />
        </ul>
        <ul className='right'>
          {elementTextRight.map((el, i) => {
            return (
              <li key={i}>
                <Link id='RouterNavLink' to={urlRight[i]}>
                  <span href='' className='flex gap fade-gray'>
                    {el}
                  </span>
                </Link>
              </li>
            )
          })}
          <li className='register-login-buttons'>
            <Link to='/login'>
              <Button text='Ingresar' />
            </Link>

            <Link to='/register'>
              <Button2 text='Registrarse' />
            </Link>
          </li>
        </ul>
      </nav>
      <div className='wrapper'></div>
    </>
  )
}

export { Navbar }
