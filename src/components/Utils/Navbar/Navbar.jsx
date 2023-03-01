import './Navbar.css'

//? Components
import { Button, Button2 } from '../../Utils'

//* Libraries
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

//* Hooks
import { Link } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext'
import { useContext } from 'react'

const Navbar = ({ elementText, url, renderButtons }) => {
  const logout = () => {
    const { setSession } = useContext(UserContext)
    setSession(false)
  }
  return (
    <>
      <nav>
        <ul className='logo'>
          <Link to='/'>
            <LazyLoadImage
              src='/logotype-small.png'
              loading='lazy'
              width={45}
              alt='Logo de Fademet Montajes'
            />
          </Link>
          <div className='left'>
            {elementText
              ? elementText.map((el, i) => {
                  return (
                    <li key={i}>
                      <Link id='RouterNavLink' to={url[i]}>
                        <p href='' className='flex gap fade-gray'>
                          {el}
                        </p>
                      </Link>
                    </li>
                  )
                })
              : ''}
          </div>
        </ul>
        <ul className='right'>
          {renderButtons === 1 ? (
            <li className='register-login-buttons'>
              <Link className='flex gap' to='/login'>
                <Button text='Ingresar' width={120} />
              </Link>
              <Link className='flex gap' to='/register'>
                <Button2 text='Registrarse' width={120} />
              </Link>
            </li>
          ) : renderButtons === 2 ? (
            <Link className='logout' onClick={logout}>
              Cerrar sesión
            </Link>
          ) : (
            ''
          )}
        </ul>
      </nav>
      <div className='wrapper'></div>
    </>
  )
}

export { Navbar }
