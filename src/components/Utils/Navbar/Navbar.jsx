import './Navbar.css'

//? Components
import { Button, Button2 } from '../../Utils'

//* Libraries
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

//* Hooks
import { Link } from 'react-router-dom'
import { SessionContext } from '../../../context/SessionContext'
import { useContext, useState } from 'react'

//? Icons
import { BiLogOut } from 'react-icons/bi'
import { AiOutlineSetting } from 'react-icons/ai'
import { FaAngleDown } from 'react-icons/fa'

const Navbar = ({ anchordText, linkText, anchordUrl, linkUrl, renderButtons }) => {
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    console.log('clicked')
    setExpanded(!expanded)
  }

  const hideUser = () => {
    console.log('holas')
    setExpanded(false)
  }

  const { setSession } = useContext(SessionContext)

  const logout = () => {
    setSession(false)
  }
  return (
    <>
      <nav className='navbar'>
        <ul className='logo'>
          <Link to='/'>
            <LazyLoadImage
              src='/logotype-small.png'
              loading='lazy'
              width={45}
              height={45}
              alt='Logo de Fademet Montajes'
            />
          </Link>
          <ul className='left'>
            {linkText
              ? linkText.map((el, i) => {
                  return (
                    <li key={i}>
                      <Link id='RouterNavLink' to={linkUrl[i]}>
                        <p className='flex gap fade-gray'>{el}</p>
                      </Link>
                    </li>
                  )
                })
              : ''}
            {anchordText
              ? anchordText.map((el, i) => {
                  return (
                    <li key={i}>
                      <a id='RouterNavLink' href={anchordUrl[i]}>
                        <p className='flex gap fade-gray'>{el}</p>
                      </a>
                    </li>
                  )
                })
              : ''}
          </ul>
        </ul>
        <ul className='right' onBlur={hideUser}>
          {renderButtons === 1 && (
            <li className='register-login-buttons'>
              <Link className='flex gap' to='/login'>
                <Button text='Ingresar' width={140} />
              </Link>
              <Link className='flex gap' to='/register'>
                <Button2 text='Registrarse' width={140} />
              </Link>
            </li>
          )}
          {renderButtons === 2 && (
            <>
              <ul onClick={handleExpandClick} className={expanded ? `user show` : 'user'}>
                <LazyLoadImage
                  loading='lazy'
                  src='/avatar1.png'
                  width={40}
                  height={40}
                  effect='blur'
                  className='user__image'
                  alt='Imagen de perfil del usuario'
                />
                <FaAngleDown className='user__icon' />
                {expanded && (
                  <>
                    <ul className='user__options'>
                      <li className='options__option'>
                        Editar perfil <AiOutlineSetting />
                      </li>
                      <li className='options__option' onClick={logout}>
                        Cerrar sesión <BiLogOut />
                      </li>
                    </ul>
                  </>
                )}
              </ul>
            </>
          )}
        </ul>
      </nav>
      <div className='wrapper'></div>
    </>
  )
}

export { Navbar }
