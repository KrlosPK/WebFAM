import './Navbar.css'

//? Components
import { Button, Button2 } from '../../Utils'

//* Hooks
import { Link } from 'react-router-dom'

const Navbar = ({ elementText, url, renderButtons = false }) => {
  return (
    <>
      <nav>
        <ul className='logo'>
          <Link to='/'>
            <img src='/logotype-small.png' width={45} alt='Logo de Fademet Montajes' />
          </Link>
          <div className='left'>
            {elementText
              ? elementText.map((el, i) => {
                  return (
                    <li key={i}>
                      <Link id='RouterNavLink' to={url[i]}>
                        <span href='' className='flex gap fade-gray'>
                          {el}
                        </span>
                      </Link>
                    </li>
                  )
                })
              : ''}
          </div>
        </ul>
        <ul className='right'>
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
