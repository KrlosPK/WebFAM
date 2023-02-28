import './Navbar.css'

//? Components
import { Button, Button2 } from '../../Utils'

//* Hooks
import { Link } from 'react-router-dom'

const Navbar = ({
  elementTextLeft,
  urlLeft,
  elementTextRight,
  urlRight,
  renderButtons = false
}) => {
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
          {renderButtons ? (
            <li className='register-login-buttons'>
              <Link className='flex gap' to='/login'>
                <Button text='Ingresar' width={120} />
              </Link>
              <Link className='flex gap' to='/register'>
                <Button2 text='Registrarse' width={120} />
              </Link>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </nav>
      <div className='wrapper'></div>
    </>
  )
}

export { Navbar }
