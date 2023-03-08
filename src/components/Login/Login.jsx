import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Button2, Input, validateMail, validatePassword, API_URL, Navbar } from '../Utils'

//? Hooks
import { useState, useRef, useEffect, useContext } from 'react'
import { SessionContext } from '../../context/SessionContext'
import { ToastifyContext } from '../../context/ToastifyContext'

//? Library
import { ToastContainer, toast, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'

//? Icons
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const Login = () => {
  //? Context
  const { setSession } = useContext(SessionContext)

  const { toastify } = useContext(ToastifyContext)

  const [token, setToken] = useState(null)

  useEffect(() => {
    if (toastify === true) {
      toast.success('¡Usuario creado con éxito!', {
        theme: 'colored'
      })
    }
  }, [toastify])

  const navigate = useNavigate()

  //? Deshabilitar botón mientras carga
  const [disabled, setDisabled] = useState(false)

  //! Cambiar título de la página
  const [title, setTitle] = useState('FADEMET Montajes | Inicio de Sesión')
  useEffect(() => {
    document.title = title
  }, [setTitle])

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

  const validateLogin = async (e) => {
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
    const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@¡!/¿?_\-\*\$\%\&\=ñÑ]{8,16}$/

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
      toast.error('¡La contraseña debe tener entre 8 y 16 caracteres, una mayúscula, una minúscula y un número!', {
        theme: 'colored'
      })

      focusInput(contrasenaInputEl)
    } else {
      setBody({ correo, contrasena })
      // setCookie()

      setDisabled(true)

      await axios
        .post(API_URL('signin'), body)
        .then(({ data }) => {
          const { Authorization } = data.Headers
          localStorage.setItem('session', 'true')

          setTokenData(Authorization)
          setSession(true)

          if (Authorization) return navigate('/')
        })
        .catch(() => {
          toast.error('¡Correo y/o contraseña incorrectos!', {
            theme: 'colored'
          })
          setDisabled(false)
        })
    }
  }

  const setTokenData = (token) => {
    setToken(token)

    const date = new Date()
    date.setTime(date.getTime() + 60 * 60 * 75 * 10000)
    document.cookie = `token=${token}; path=https://fademetmontajes.netlify.app/; secure; SameSite=Lax`
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

  // * Set cookie for remember me
  /*   const setCookie = () => {
    if (document.querySelector('#check').checked) {
      if (document.querySelector('#correo').value === '' || document.querySelector('#contrasena').value === '') {
        toast.error('¡Debes tener tus datos correctos para recordar! Vuelve a intentarlo...', {
          theme: 'colored'
        })

        return (document.querySelector('#check').checked = false)
      }

      const correo = document.querySelector('#correo').value
      const contrasena = document.querySelector('#contrasena').value
      const correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      const contrasenaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@¡!/¿?_\-\*\$\%\&\=ñÑ]{8,16}$/

      if (validateMail(correo, correoRegex) || validatePassword(contrasena, contrasenaRegex)) {
        const date = new Date()
        date.setTime(date.getTime() + 60 * 60 * 75 * 10000)

        document.cookie = `correo=${correo}; expires=${date.toUTCString()}; path=https://fademetmontajes.netlify.app/login; secure; SameSite=Lax`
        document.cookie = `contrasena=${contrasena}; expires=${date.toUTCString()}; path=https://fademetmontajes.netlify.app/login; secure; SameSite=Lax`
      }
    } else {
      //clear cookies
      const correo = document.querySelector('#correo').value
      const contrasena = document.querySelector('#contrasena').value

      document.cookie = `correo=${correo}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=http://localhost:3000/login; Secure`
      document.cookie = `contrasena=${contrasena}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=http://localhost:3000/login; Secure`
    }
  } */

  // const getCookieData = () => {
  //   if (document.cookie.length !== 0) {
  //     const cookies = document.cookie.split(';')
  //     const correo = cookies[0].split('=')[1]
  //     const contrasena = cookies[1].split('=')[1]

  //     if (correo !== '' || contrasena !== '') {
  //       document.querySelector('#check').checked = true
  //       document.querySelector('#correo').value = correo
  //       document.querySelector('#contrasena').value = contrasena
  //       setBody({ correo, contrasena })
  //     }
  //   }
  // }

  return (
    <div className='login-div'>
      <ToastContainer transition={Zoom} limit={3} pauseOnFocusLoss={false} />
      <Navbar renderButtons={3} />
      <section className='login-form'>
        <div className='first-login'>
          <p>Para continuar, inicie sesión</p>
          <div className='buttons'>
            <GoogleOAuthProvider clientId='294667816272-supt23ie3grtgl1ed50n6e1et58st5f1.apps.googleusercontent.com'>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  const { credential } = credentialResponse
                  try {
                    // Contiene los datos del cliente en google
                    let decoded = jwt_decode(credential)
                    localStorage.setItem('session', 'true')
                    setSession(true)
                    navigate('/')
                  } catch (err) {
                    console.log(err)
                  }
                }}
                onError={() => {
                  console.log('Login Failed')
                }}
                size='medium'
                shape='circle'
                width='300'
                useOneTap
                ux_mode='popup'
              />
            </GoogleOAuthProvider>
          </div>
          <div className='between-session'>
            <div className='line-breaker' />
            <p>ó</p>
            <div className='line-breaker' />
          </div>
        </div>
        <form className='second-login' onSubmit={validateLogin}>
          <div className='main-form'>
            <Input text='Correo electrónico' innerId='correo' type='email' nameID='correo' value={body.correo} innerRef={correoInputEl} innerOnChange={inputChange} />
            <div className='input-container'>
              <Input text='Contraseña' innerId='contrasena' type={showContrasena ? 'password' : 'text'} nameID='contrasena' value={body.contrasena} innerRef={contrasenaInputEl} innerOnChange={inputChange} />
              <div onClick={handleShowContrasenaClick}>{showContrasena ? <FaEye className='eye' /> : <FaEyeSlash className='eye' />}</div>
            </div>
          </div>
          <div className='forgot-password'>
            <Link to={'/recover-password'}>¿Olvidaste tú contraseña?</Link>
          </div>
          <div className='remind-me'>
            <input type='checkbox' name='check' id='check' />
            <label htmlFor='check'></label>
            <Button text={'Ingresar'} textDisabled={'Cargando'} disable={disabled} />
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
