import './Navbar.css'

//? Components
import { Button, Button2 } from '../../Utils'

//* Libraries
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

//* Hooks
import { Link } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext'
import { useContext, useState } from 'react'

//? Icons
import { BiLogOut } from 'react-icons/bi'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

const Navbar = ({ elementText, url, renderButtons }) => {
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const { setSession } = useContext(UserContext)
  const logout = () => {
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
            // <div className='user' onClick={() => handleExpandClick()}>
            //   <h3 className='user__image'>
            //     <img src='/avatar1.png' alt='Imagen de perfil del usuario' />
            //   </h3>
            //   <div className={expanded ? `user__options show` : 'user__options'}>
            //     <div className='logout' onClick={logout}>
            //       <Link onClick={logout}>
            //         Cerrar sesión <BiLogOut />
            //       </Link>
            //     </div>
            //   </div>
            //   {expanded ? (
            //     <FaAngleUp className='user__icon' />
            //   ) : (
            //     <FaAngleDown className='user__icon' />
            //   )}
            // </div>
            <div className='logout'>
              <Link onClick={logout}>
                Cerrar sesión <BiLogOut />
              </Link>
            </div>
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
