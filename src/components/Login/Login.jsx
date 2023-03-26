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
  verifyStatus
} from '../Utils'

// ? Hooks
import { useState, useRef, useEffect, useContext } from 'react'
import { ToastifyContext } from '../../context/ToastifyContext'

// ? Library
import { ToastContainer, toast, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import jwtDecode from 'jwt-decode'
import cookie from 'js-cookie'

// ? Icons
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { SessionContext } from '../../context/SessionContext'

const Login = () => {
  // ? Context

  const { toastify } = useContext(ToastifyContext)
  const { setSession } = useContext(SessionContext)

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
    if (toastify === 'citaValidar') {
      toast.info('¡Debes iniciar sesión para agendar una cita!', {
        theme: 'colored'
      })
      focusInput(correoInputEl)
    }
  }, [toastify])

  const navigate = useNavigate()

  // ? Deshabilitar botón mientras carga
  const [disabled, setDisabled] = useState(false)

  // ! Cambiar título de la página
  useEffect(() => { document.title = 'FADEMET Montajes | Inicio de Sesión' }, [])

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
    setDisabled(true)
    if (disabled) return

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
    const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@¡!/¿?_\-.#+*$~%&=ñÑ]{8,16}$/

    // ? Validación Correo
    if (validateMail(correo, /^\s+$/)) {
      toast.error('¡El correo no puede estar vacío!', {
        theme: 'colored'
      })

      focusInput(correoInputEl)
      setDisabled(false)
    } else if (!validateMail(correo, /\S+@\S+/)) {
      toast.error('¡El correo debe contener "@dominio.com"!', {
        theme: 'colored'
      })

      focusInput(correoInputEl)
      setDisabled(false)
    } else if (!validateMail(correo, /\S+\.\S+/)) {
      toast.error('¡El correo debe contener "@dominio.com"!', {
        theme: 'colored'
      })

      focusInput(correoInputEl)
      setDisabled(false)
    } else if (validatePassword(contrasena, /^\s+$/)) {
      // Validación Contraseña

      toast.error('¡La contraseña no puede estar vacía!', {
        theme: 'colored'
      })

      focusInput(contrasenaInputEl)
      setDisabled(false)
    } else if (!validatePassword(contrasena, regexContrasena)) {
      toast.error(
        '¡La contraseña debe tener entre 8 y 16 caracteres, una mayúscula, una minúscula y un número!',
        {
          theme: 'colored'
        }
      )

      focusInput(contrasenaInputEl)
      setDisabled(false)
    } else {
      setBody({ correo, contrasena })

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
        const domain = window.location.hostname
        cookie.set('session', true, { domain, path: '' })
        cookie.set('token', token, { domain, path: '' })
        setSession(true)
        return (token && navigate('/', { replace: true }))
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
        const domain = window.location.hostname
        cookie.set('session', true, { domain, path: '' })
        cookie.set('token', token, { domain, path: '' })
        setSession(true)
        return (token && navigate('/', { replace: true }))
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
                ux_mode='popup'
                useOneTap
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
