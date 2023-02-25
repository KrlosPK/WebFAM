import './Navbar.css'

//? Components
import { Button, Button2 } from '../../Utils'

//* Hooks
import { Link } from 'react-router-dom'

const Navbar = ({ elementTextLeft, urlLeft, elementTextRight, urlRight, renderButton }) => {
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
          <Link to='/'>
            <img src='/WebFAM_logo.png' width={120} alt='Logo de Fademet Montajes' />
          </Link>
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
          {renderButton
            ? renderButton.map((btn, i) => {
                return (
                  <li className='register-login-buttons' key={i}>
                    <Link to='/login'>
                      <Button text='Ingresar' />
                    </Link>
                    {btn}
                    <Link to='/register'>
                      <Button2 text='Registrarse' />
                    </Link>
                  </li>
                )
              })
            : ''}
        </ul>
      </nav>
      <div className='wrapper'></div>
    </>
  )
}

export { Navbar }
