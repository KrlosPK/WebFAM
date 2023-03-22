import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import {
  Button,
  Button2,
  Input,
  validateMail,
  validatePassword,
  API_URL,
  Navbar,
  setTokenData,
  verifyStatus
} from '../Utils'

// ? Hooks
import { useState, useRef, useEffect, useContext } from 'react'
import { SessionContext } from '../../context/SessionContext'
import { ToastifyContext } from '../../context/ToastifyContext'

// ? Library
import { ToastContainer, toast, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import jwtDecode from 'jwt-decode'

// ? Icons
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const Login = () => {
  // ? Context
  const { setSession, setTempSession } = useContext(SessionContext)

  const { toastify } = useContext(ToastifyContext)

  useEffect(() => {
    if (toastify === 'login') {
      toast.success('¡Usuario creado con éxito!', {
        theme: 'colored'
      })
      focusInput(correoInputEl)
    }
    if (toastify === 'recover') {
      toast.success('¡Contraseña restablecida con éxito!', {
        theme: 'colored'
      })
      focusInput(correoInputEl)
    }
  }, [toastify])

  const navigate = useNavigate()

  // ? Deshabilitar botón mientras carga
  const [disabled, setDisabled] = useState(false)

  // ! Cambiar título de la página
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

  useEffect(() => {
    focusInput(correoInputEl)
  }, [toastify])

  //* Variables para hacer la validación
  const correoInputEl = useRef(null)
  const contrasenaInputEl = useRef(null)

  const validateLogin = async (e) => {
    e.preventDefault()

    const correo = e.target[0].value
    const contrasena = e.target[1].value

    /*
      Con el operador ?= (look ahead) compruebas que:
      * @params: Exista al menos 1 número (?:.*[0-9]){1}
      * @params: Exista al menos 1 mayúscula (?:.*[A-Z]){1}
      * @params: Exista al menos 1 minúscula (?:.*[a-z]){1}
      ? Con el cuantificador {8,} indicas que debe tener una longitud mínima de 8 sin límite máximo.

      ? Con \S no permite espacios en blanco.
    */
    const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@¡!/¿?_\-*$%&=ñÑ]{8,16}$/

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
    } else if (validatePassword(contrasena, /^\s+$/)) {
      // Validación Contraseña
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

      focusInput(contrasenaInputEl)
    } else {
      setBody({ correo, contrasena })
      rememberSession()

      setDisabled(true)
      await loginUser()
    }
  }

  const loginUser = async () => {
    await axios
      .post(API_URL('signin'), body)
      .then(({ data }) => {
        const { token } = data

        const estadoDataUser = jwtDecode(token)
        const { estado } = estadoDataUser.data[0]

        const status = verifyStatus(estado, { toast, setDisabled })
        if (!status) return false
        setTokenData(token)
        sessionStorage.setItem('session', 'true')
        setTempSession(true)

        setSession(true)

        if (token) return navigate('/', { replace: true })
      })
      .catch(() => {
        toast.error('¡Correo y/o contraseña incorrectos!', {
          theme: 'colored'
        })
        setDisabled(false)
      })
  }

  const googleLogin = async (email) => {
    await axios
      .post(API_URL('comprobarCorreo'), { correo: email, tipo: 'google' })
      .then(({ data }) => {
        const { token } = data
        const estadoDataUser = jwtDecode(token)
        const { estado } = estadoDataUser.data[0]

        const status = verifyStatus(estado, { toast, setDisabled })
        if (!status) return false
        setTokenData(token)
        sessionStorage.setItem('session', 'true')
        setTempSession(true)
        navigate('/', { replace: true })
      })
      .catch(() => {
        toast.error('¡El correo no existe en nuestro sistema! Primero regístrate', {
          theme: 'colored'
        })
        setDisabled(false)
      })
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

  const rememberSession = () => {
    const rememberMe = document.querySelector('#check').checked
    if (rememberMe) {
      localStorage.setItem('session', 'true')
    } else {
      localStorage.removeItem('session')
    }
  }

  const checkRememberMe = () => {
    if (document.querySelector('#check').checked) {
      const correo = document.querySelector('#correo').value
      const contrasena = document.querySelector('#contrasena').value
      const correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      const contrasenaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@¡!/¿?_\-*$%&=ñÑ]{8,16}$/

      if (!validateMail(correo, correoRegex) || !validatePassword(contrasena, contrasenaRegex)) {
        toast.error('¡Debes tener tus datos correctos para recordar! Vuelve a intentarlo...', {
          theme: 'colored'
        })
        return (document.querySelector('#check').checked = false)
      }
    }
  }

  return (
    <div className='login-div'>
      <ToastContainer transition={Zoom} limit={3} pauseOnFocusLoss={false} />
      <Navbar renderButtons={3} />
      <section className='login-form'>
        <div className='first-login'>
          <p>Para continuar, inicie sesión</p>
          <div className='buttons'>
            <GoogleOAuthProvider clientId='1080803906494-0hbpsufmopje9arrn1o1ofua1qbesjoa.apps.googleusercontent.com'>
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  const { credential } = credentialResponse
                  try {
                    const decoded = jwtDecode(credential)
                    const { email } = decoded
                    await googleLogin(email)
                  } catch (err) {
                    toast.error('¡Error al iniciar sesión con Google! Vuelve a intentarlo...', {
                      theme: 'colored'
                    })
                  }
                }}
                onError={() => {
                  toast.error('¡Error al iniciar sesión con Google! Vuelve a intentarlo...', {
                    theme: 'colored'
                  })
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
            <Input
              text='Correo electrónico'
              innerId='correo'
              type='email'
              nameID='correo'
              value={body.correo}
              innerRef={correoInputEl}
              innerOnChange={inputChange}
            />
            <div className='input-container'>
              <Input
                text='Contraseña'
                innerId='contrasena'
                type={showContrasena ? 'password' : 'text'}
                nameID='contrasena'
                value={body.contrasena}
                innerRef={contrasenaInputEl}
                innerOnChange={inputChange}
              />
              <div onClick={handleShowContrasenaClick}>
                {showContrasena ? <FaEye className='eye' /> : <FaEyeSlash className='eye' />}
              </div>
            </div>
          </div>
          <div className='forgot-password'>
            <Link to={'/recover-password'}>¿Olvidaste tú contraseña?</Link>
          </div>
          <div className='remind-me'>
            <input type='checkbox' name='check' id='check' onClick={checkRememberMe} />
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
