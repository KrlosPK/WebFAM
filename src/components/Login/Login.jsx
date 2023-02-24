import './Login.css'
import { Link } from 'react-router-dom'
import { Button, Button2, Input, validateMail, validatePassword } from '../Utils'

//? Hooks
import { useState, useRef, useEffect } from 'react'

//? Library
import { ToastContainer, toast, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import bcrypt from 'bcrypt'

//? Icons
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
import { AiFillFacebook } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

const Login = () => {
  //* Mostrar contraseña
  const [showContrasena, setShowContrasena] = useState(true)

  const handleShowContrasenaClick = () => {
    showContrasena ? setShowContrasena(false) : setShowContrasena(true)
  }

  //* Función para hacer focus en el input que no cumpla con los requisitos
  const focusInput = (input) => input.current.focus()

  //* Variables para hacer la validación
  const correoInputEl = useRef(null)
  const contrasenaInputEl = useRef(null)

  const validateLogin = (e) => {
    e.preventDefault()

    const correo = e.target[0].value
    const contrasena = e.target[1].value

    /*
			Con el operador ?= (look ahead) compruebas que:
				* Exista al menos 1 número (?:.*[0-9]){1}
				* Exista al menos 1 mayúscula (?:.*[A-Z]){1}
				* Exista al menos 1 minúscula (?:.*[a-z]){1}

			? Con el cuantificador {8,} indicas que debe tener una longitud mínima de 8 sin límite máximo.
2
			? Con \S no permite espacios en blanco.
		*/
    const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!\s)[a-zA-Z\d]{8,16}$/

    // ? Validación Correo
    if (validateMail(correo, /^\s+$/)) {
      e.preventDefault()

      toast.error('¡El correo no puede estar vacío!', {
        theme: 'colored'
      })

      focusInput(correoInputEl)
    } else if (!validateMail(correo, /\S+@\S+/)) {
      e.preventDefault()

      toast.error('¡El correo debe contener "@dominio.com"!', {
        theme: 'colored'
      })

      focusInput(correoInputEl)
    } else if (!validateMail(correo, /\S+\.\S+/)) {
      e.preventDefault()

      toast.error('¡El correo debe contener "@dominio.com"!', {
        theme: 'colored'
      })

      focusInput(correoInputEl)
    }

    // Validación Contraseña
    else if (validatePassword(contrasena, /^\s+$/)) {
      e.preventDefault()

      toast.error('¡La contraseña no puede estar vacía!', {
        theme: 'colored'
      })

      focusInput(contrasenaInputEl)
    } else if (!validatePassword(contrasena, regexContrasena)) {
      e.preventDefault()

      toast.error(
        '¡La contraseña debe tener entre 8 y 16 caracteres, una mayúscula, una minúscula y un número!',
        {
          theme: 'colored'
        }
      )
    } else {
      toast.success('¡Listo para implementar Axios!', {
        theme: 'colored'
      })
    }
    setBody({ correo, contrasena })
    //TODO Axios
  }

  //* guarda correo y contraseña
  const [body, setBody] = useState({ correo: '', contrasena: '' })

  const inputChange = ({ target }) => {
    const { name, value } = target
    setBody({
      ...body,
      [name]: value
    })
  }

  return (
    <div className='login-div'>
      <ToastContainer transition={Zoom} limit={3} pauseOnFocusLoss={false} />
      <header className='login-header'>
        <img src='../assets/WebFAM_logo.png' width={120} alt='WebFAM logo' />
        <Link className='go-back' to='/'>
          ← Volver
        </Link>
      </header>
      <hr className='header-line' />
      <section className='login-form'>
        <div className='first-login'>
          <p>Para continuar, inicie sesión</p>
          <div className='buttons'>
            <button className='Login-button button_fb'>
              <AiFillFacebook /> Continúa con Facebook
            </button>
            <button className='Login-button button_gg'>
              <FcGoogle /> Continúa con
              <div className='google_gradient'>Google</div>
            </button>
          </div>
          <div className='between-session'>
            <div className='line-breaker' />
            <p>ó</p>
            <div className='line-breaker' />
          </div>
        </div>
        <form className='second-login' onSubmit={validateLogin}>
          <div className='main-form'>
            <Input
              text='Correo electrónico'
              type='email'
              nameID='correo'
              value={body.correo}
              innerRef={correoInputEl}
              onChange={inputChange}
            />
            <div className='input-container'>
              <Input
                text='Contraseña'
                type={showContrasena ? 'password' : 'text'}
                nameID='contrasena'
                value={body.contrasena}
                innerRef={contrasenaInputEl}
                onChange={inputChange}
              />
              <div onClick={handleShowContrasenaClick}>
                {showContrasena ? <FaEye className='eye' /> : <FaEyeSlash className='eye' />}
              </div>
            </div>
          </div>
          <div className='forgot-password'>
            <Link to={'/'}>¿Olvidaste tú contraseña?</Link>
          </div>
          <div className='remind-me'>
            <input type='checkbox' name='check' id='check' />
            <label htmlFor='check'></label>
            <Button text={'Ingresar'} />
          </div>
        </form>
      </section>
      <div className='breaker-footer' />
      <section className='register-section'>
        <h4>¿Aún no tienes cuenta?</h4>
        <Link to={'/register'}>
          <Button2 text='Regístrate' width={280} />
        </Link>
      </section>
    </div>
  )
}
export { Login }
