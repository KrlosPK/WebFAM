import './Register.css'
import { Link } from 'react-router-dom'
import { Button, Button2, Input, Select } from '../Utils'

//? Hooks
import { useState, useRef } from 'react'

//? Library
import { ToastContainer, toast, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//? Icons
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'

const Register = () => {
  const toastIdRegister = useRef(null)

  //* Mostrar contraseña
  const [showPassword, setShowPassword] = useState(true)

  const handleShowPasswordClick = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true)
  }

  // ? TOAST NOTIFICATIONS
  // const { addToast, removeAllToasts } = useToasts()

  // Función para hacer focus en el input que no cumpla con los requisitos
  const focusInput = (input) => input.current.focus()

  // Variables para hacer la validación
  const nombreInputEl = useRef(null)
  const apellidosInputEl = useRef(null)
  const numCelularInputEl = useRef(null)
  const tipoDocumentoInputEl = useRef(null)
  const numDocumentoInputEl = useRef(null)
  const correoInputEl = useRef(null)
  const contrasenaInputEl = useRef(null)

  const validateRegister = (e) => {
    e.preventDefault()

    const nombre = e.target[0].value
    const apellidos = e.target[1].value
    const numCelular = e.target[2].value
    const tipoDocumento = e.target[3].value
    const numDocumento = e.target[4].value
    const correo = e.target[5].value
    const contrasena = e.target[6].value

    const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!\s)[a-zA-Z\d]{8,16}$/

    // Validación Nombre
    if (nombre.length === 0 || /^\s+$/.test(nombre)) {
      e.preventDefault()

      if (!toast.isActive(toastIdRegister.current)) {
        toastIdRegister.current = toast.error('¡El Nombre no puede estar vacío!', {
          theme: 'colored'
        })
      }

      focusInput(nombreInputEl)
    } else if (nombre.length < 2) {
      e.preventDefault()

      if (!toast.isActive(toastIdRegister.current)) {
        toastIdRegister.current = toast.error('¡El Nombre debe tener mínimo 2 letras!', {
          theme: 'colored'
        })
      }

      focusInput(nombreInputEl)
    }

    // Validación Apellidos
    else if (apellidos.length === 0 || /^\s+$/.test(apellidos)) {
      e.preventDefault()

      if (!toast.isActive(toastIdRegister.current)) {
        toastIdRegister.current = toast.error('¡Los Apellidos no puede estar vacío!', {
          theme: 'colored'
        })
      }

      focusInput(apellidosInputEl)
    } else if (apellidos.length < 4) {
      e.preventDefault()

      if (!toast.isActive(toastIdRegister.current)) {
        toastIdRegister.current = toast.error('¡Los Apellidos deben tener mínimo 4 letras!', {
          theme: 'colored'
        })
      }

      focusInput(apellidosInputEl)
    }

    // Validación Número de Celular
    else if (numCelular.length === 0) {
      e.preventDefault()

      if (!toast.isActive(toastIdRegister.current)) {
        toastIdRegister.current = toast.error('¡El Número de Celular no puede estar vacío!', {
          theme: 'colored'
        })
      }

      focusInput(numCelularInputEl)
    } else if (numCelular.length < 9 || numCelular.length >= 12) {
      e.preventDefault()

      if (!toast.isActive(toastIdRegister.current)) {
        toastIdRegister.current = toast.error('¡El Número de Celular debe tener entre 9 y 11 dígitos!', {
          theme: 'colored'
        })
      }

      focusInput(numCelularInputEl)
    }
    // Validación Tipo de Documento
    else if (!tipoDocumento) {
      e.preventDefault()

      if (!toast.isActive(toastIdRegister.current)) {
        toastIdRegister.current = toast.error('¡Por favor seleccione su Tipo de Documento!', {
          theme: 'colored'
        })
      }

      focusInput(tipoDocumentoInputEl)
    }

    // Validación Número de Documento
    else if (numDocumento.length === 0) {
      e.preventDefault()

      if (!toast.isActive(toastIdRegister.current)) {
        toastIdRegister.current = toast.error('¡El Número de Documento no puede estar vacío!', {
          theme: 'colored'
        })
      }

      focusInput(numDocumentoInputEl)
    } else if (numDocumento.length < 9 || numDocumento.length >= 12) {
      e.preventDefault()

      if (!toast.isActive(toastIdRegister.current)) {
        toastIdRegister.current = toast.error('¡El Número de Celular debe tener entre 9 y 11 dígitos!', {
          theme: 'colored'
        })
      }

      focusInput(numDocumentoInputEl)
    }
    // Validación Correo Electrónico
    else if (correo.length === 0 || /^\s+$/.test(correo)) {
      e.preventDefault()

      if (!toast.isActive(toastIdRegister.current)) {
        toastIdRegister.current = toast.error('¡El correo no puede estar vacío!', {
          theme: 'colored'
        })
      }

      focusInput(correoInputEl)
    } else if (!/\S+@\S+/.test(correo)) {
      e.preventDefault()

      if (!toast.isActive(toastIdRegister.current)) {
        toastIdRegister.current = toast.error('¡El correo debe contener "@dominio.com"!', {
          theme: 'colored'
        })
      }

      focusInput(correoInputEl)
    } else if (!/\S+\.\S+/.test(correo)) {
      e.preventDefault()

      if (!toast.isActive(toastIdRegister.current)) {
        toastIdRegister.current = toast.error('¡El correo debe contener "@dominio.com"!', {
          theme: 'colored'
        })
      }

      focusInput(correoInputEl)
    }

    // Validación Contraseña
    else if (contrasena.length === 0 || /^\s+$/.test(contrasena)) {
      e.preventDefault()

      if (!toast.isActive(toastIdRegister.current)) {
        toastIdRegister.current = toast.error('¡La contraseña no puede estar vacía!', {
          theme: 'colored'
        })
      }

      focusInput(contrasenaInputEl)
    } else if (!regexContrasena.test(contrasena)) {
      e.preventDefault()

      if (!toast.isActive(toastIdRegister.current)) {
        toastIdRegister.current = toast.error('¡La contraseña debe tener entre 8 y 16 caracteres, una mayúscula, una minúscula y un número!', {
          theme: 'colored'
        })
      }

      focusInput(contrasenaInputEl)
    } else {
      if (!toast.isActive(toastIdRegister.current)) {
        toastIdRegister.current = toast.success('¡Listo para implementar Axios!', {
          theme: 'colored'
        })
      }
    }
  }

  const [body, setBody] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    num_celular: '',
    num_documento: '',
    contrasena: ''
  })

  const inputChange = ({ target }) => {
    const { name, value } = target
    setBody({
      ...body,
      [name]: value
    })
  }

  return (
    <div className='login-div'>
      <ToastContainer transition={Zoom} />
      <header className='login-header'>
        <img src='../assets/WebFAM_logo.png' width={120} alt='WebFAM logo' />
        <Link className='go-back' to='/'>
          ← Volver
        </Link>
      </header>
      <hr className='header-line' />
      <section className='login-form'>
        <div className='register-label'>
          <p>Regístrate</p>
        </div>
        <form className='second-login' onSubmit={validateRegister}>
          <div className='main-form'>
            <Input text='Nombre' nameID='nombre' value={body.nombre} innerRef={nombreInputEl} onChange={inputChange} />

            <Input text='Apellidos' nameID='apellidos' value={body.apellidos} innerRef={apellidosInputEl} onChange={inputChange} />

            <Input text='Número de celular' type='number' nameID='num_celular' value={body.num_celular} innerRef={numCelularInputEl} onChange={inputChange} />

            <Select text='Tipo de Documento' value={['CC', 'CE', 'TI', 'NIT']} option={['Cédula de Ciudadanía', 'Cédula de Extranjería', 'Tarjeta de Identidad', 'Número de Identificación Tributaria']} innerRef={tipoDocumentoInputEl} />

            <Input text='Número de Documento' type='number' nameID='num_documento' value={body.num_documento} innerRef={numDocumentoInputEl} onChange={inputChange} />

            <Input text='Correo' nameID='correo' value={body.correo} innerRef={correoInputEl} onChange={inputChange} />

            <div className='input-container'>
              <Input text='Contraseña' nameID='contrasena' type={showPassword ? 'password' : 'text'} value={body.contrasena} innerRef={contrasenaInputEl} onChange={inputChange} />
              <div onClick={handleShowPasswordClick}>{showPassword ? <FaEye className='eye' /> : <FaEyeSlash className='eye' />}</div>
            </div>
          </div>
          <div className='register'>
            <Button text={'Registrarse'} />
          </div>
        </form>
      </section>
      <div className='breaker-footer' />
      <section className='register-section'>
        <h4>¿Ya tienes cuenta?</h4>
        <Link to={'/login'}>
          <Button2 text='Inicia sesión' width={280} />
        </Link>
      </section>
    </div>
  )
}

export { Register }
