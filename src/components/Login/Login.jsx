import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Button2, Input, validateMail, validatePassword, API_URL, Navbar, ResponsiveNav } from '../Utils'

//? Hooks
import { useState, useRef, useEffect, useContext } from 'react'
import { UserContext } from '../../context/UserContext'

//? Library
import { ToastContainer, toast, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

//? Icons
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
import { AiFillBackward, AiFillFacebook } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

const Login = () => {
  //? Context
  const { session, setSession } = useContext(UserContext)

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
      toast.error('¡La contraseña debe tener entre 8 y 16 caracteres, una mayúscula, una minúscula y un número!', {
        theme: 'colored'
      })

      focusInput(contrasenaInputEl)
    } else {
      setBody({ correo, contrasena })

      setDisabled(true)

      await axios
        .post(API_URL('signin'), body)
        .then(({ data }) => {
          const { result } = data

          setSession(true)

          if (result) return navigate('/')
          /* toast.success('Iniciando sesión...', {
            theme: 'colored'
          }) */
        })
        .catch((e) => {
          toast.error('¡Correo y/o contraseña incorrectos!', {
            theme: 'colored'
          })
          setDisabled(false)
        })
    }
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

  // * Set cookie for remember me
  const setCookie = (days = 30) => {
    if (document.querySelector('#check').checked) {
      if (document.querySelector('#correo').value === '' || document.querySelector('#contraseña').value === '') {
        toast.error('Debes tener tus datos correctos para recordar, vuelve a intentarlo', {
          theme: 'colored'
        })
        return (document.querySelector('#check').checked = false)
      }
      const correo = document.querySelector('#correo').value
      const contrasena = document.querySelector('#contraseña').value
      if (validateMail(correo, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) || validatePassword(contrasena, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!\s)[a-zA-Z\d]{8,16}$/)) {
        document.cookie = `username=${correo}; expires=${days}; path=http://localhost:3000/login/; SameSite=None; Secure`
        document.cookie = `password=${contrasena}; expires=${days}; path=http://localhost:3000/login/; SameSite=None; Secure`
      }
    }
  }

  const getCookieData = () => {
    const cookies = document.cookie.split(';')
    const correo = cookies[0].split('=')[1]
    const contrasena = cookies[1].split('=')[1]
    if (correo !== '' || contrasena !== '') {
      document.querySelector('#correo').value = correo
      document.querySelector('#contraseña').value = contrasena
    }
  }

  return (
    <div className='login-div' onLoad={getCookieData}>
      <ToastContainer transition={Zoom} limit={3} pauseOnFocusLoss={false} />
      <ResponsiveNav elementText={['Inicio']} url={['/']} />
      <Navbar elementTextLeft={['Inicio']} urlLeft={['/']} elementTextRight={['']} urlRight={['']} renderButtons={3} />
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
            <Input text='Correo electrónico' innerId='correo' type='email' nameID='correo' value={body.correo} innerRef={correoInputEl} innerOnChange={inputChange} />
            <div className='input-container'>
              <Input text='Contraseña' innerId='contraseña' type={showContrasena ? 'password' : 'text'} nameID='contrasena' value={body.contrasena} innerRef={contrasenaInputEl} innerOnChange={inputChange} />
              <div onClick={handleShowContrasenaClick}>{showContrasena ? <FaEye className='eye' /> : <FaEyeSlash className='eye' />}</div>
            </div>
          </div>
          <div className='forgot-password'>
            <Link to={'/'}>¿Olvidaste tú contraseña?</Link>
          </div>
          <div className='remind-me'>
            <input type='checkbox' name='check' id='check' onClick={setCookie} />
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
