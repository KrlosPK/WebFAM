import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Button2, Input, Select, API_URL, Navbar } from '../Utils'

//? Hooks
import { useState, useRef, useEffect, useContext } from 'react'
import { ToastifyContext } from '../../context/ToastifyContext'

//? Library
import { ToastContainer, toast, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//? Icons
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
import axios from 'axios'

const Register = () => {
  //? Context
  const { setToastify } = useContext(ToastifyContext)

  useEffect(() => {
    setToastify(false)
  }, [setToastify])

  const navigate = useNavigate()

  //? Deshabilitar botón mientras carga
  const [disabled, setDisabled] = useState(false)

  //! Cambiar título de la página
  const [title, setTitle] = useState('FADEMET Montajes - Registro')
  useEffect(() => {
    document.title = title
  }, [setTitle])

  //* Mostrar contraseña
  const [showPassword, setShowPassword] = useState(true)

  const handleShowPasswordClick = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true)
  }

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

  //! Evitar que se envie otro formulario de registro cuando ya lo hizo previamente
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  const createUser = async (e) => {
    e.preventDefault()

    const nombre = e.target[0].value
    const apellidos = e.target[1].value
    const num_celular = e.target[2].value
    const tipo_documento = e.target[3].value
    const num_documento = e.target[4].value
    const correo = e.target[5].value
    const contrasena = e.target[6].value

    const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@¡!/¿?_\-\*\$\%\&\=ñÑ]{8,16}$/

    // Validación Nombre
    if (nombre.length === 0 || /^\s+$/.test(nombre)) {
      e.preventDefault()

      toast.error('¡El Nombre no puede estar vacío!', {
        theme: 'colored'
      })

      focusInput(nombreInputEl)

      return false
    } else if (nombre.length < 2) {
      e.preventDefault()

      toast.error('¡El Nombre debe tener mínimo 2 letras!', {
        theme: 'colored'
      })

      focusInput(nombreInputEl)

      return false
    }
    // Validación Apellidos
    else if (apellidos.length === 0 || /^\s+$/.test(apellidos)) {
      e.preventDefault()

      toast.error('¡Los Apellidos no puede estar vacío!', {
        theme: 'colored'
      })

      focusInput(apellidosInputEl)

      return false
    } else if (apellidos.length < 3) {
      e.preventDefault()

      toast.error('¡Los Apellidos deben tener mínimo 3 letras!', {
        theme: 'colored'
      })

      focusInput(apellidosInputEl)

      return false
    }
    // Validación Número de Celular
    else if (num_celular.length === 0) {
      e.preventDefault()

      toast.error('¡El Número de Celular no puede estar vacío!', {
        theme: 'colored'
      })

      focusInput(numCelularInputEl)

      return false
    } else if (num_celular.length < 9 || num_celular.length >= 12) {
      e.preventDefault()

      toast.error('¡El Número de Celular debe tener entre 9 y 11 dígitos!', {
        theme: 'colored'
      })

      focusInput(numCelularInputEl)

      return false
    }
    // Validación Tipo de Documento
    else if (!tipo_documento) {
      e.preventDefault()

      toast.error('¡Por favor seleccione su Tipo de Documento!', {
        theme: 'colored'
      })

      focusInput(tipoDocumentoInputEl)

      return false
    }
    // Validación Número de Documento
    else if (num_documento.length === 0) {
      e.preventDefault()

      toast.error('¡El Número de Documento no puede estar vacío!', {
        theme: 'colored'
      })

      focusInput(numDocumentoInputEl)

      return false
    } else if (num_documento.length < 7 || num_documento.length >= 12) {
      e.preventDefault()

      toast.error('¡El Número de Documento debe tener entre 7 y 12 dígitos!', {
        theme: 'colored'
      })

      focusInput(numDocumentoInputEl)

      return false
    }
    // Validación Correo Electrónico
    else if (correo.length === 0 || /^\s+$/.test(correo)) {
      e.preventDefault()

      toast.error('¡El correo no puede estar vacío!', {
        theme: 'colored'
      })

      focusInput(correoInputEl)

      return false
    } else if (!/\S+@\S+/.test(correo)) {
      e.preventDefault()

      toast.error('¡El correo debe contener "@dominio.com"!', {
        theme: 'colored'
      })

      focusInput(correoInputEl)

      return false
    } else if (!/\S+\.\S+/.test(correo)) {
      e.preventDefault()

      toast.error('¡El correo debe contener "@dominio.com"!', {
        theme: 'colored'
      })

      focusInput(correoInputEl)

      return false
    }
    // Validación Contraseña
    else if (contrasena.length === 0 || /^\s+$/.test(contrasena)) {
      e.preventDefault()

      toast.error('¡La contraseña no puede estar vacía!', {
        theme: 'colored'
      })

      focusInput(contrasenaInputEl)

      return false
    } else if (!regexContrasena.test(contrasena)) {
      e.preventDefault()

      toast.error('¡La contraseña debe tener entre 8 y 16 caracteres, una mayúscula, una minúscula y un número!', {
        theme: 'colored'
      })

      focusInput(contrasenaInputEl)

      return false
    } else {
      setBody({ nombre, apellidos, correo, num_celular, contrasena, tipo_documento, num_documento })

      setDisabled(true)
      await axios
        .post(API_URL('signup'), body)
        .then(() => {
          setToastify(true)
          navigate('/login')
        })
        .catch(() => {
          toast.error('¡Este usuario ya existe!', {
            theme: 'colored'
          })
          setDisabled(false)
        })
    }
  }

  const [body, setBody] = useState({
    nombre: ''.trim(),
    apellidos: ''.trim(),
    correo: '',
    num_celular: '',
    contrasena: '',
    tipo_documento: '',
    num_documento: ''
  })

  const inputChange = ({ target }) => {
    const { name, value } = target
    setBody({
      ...body,
      [name]: value
    })
  }
  const selectChange = ({ target }) => {
    const { name } = target
    const { value } = target
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
        <div className='register-label'>
          <p>Regístrate</p>
        </div>
        <form className='second-login' onSubmit={createUser} onKeyDown={handleKeyDown}>
          <div className='main-form'>
            <Input text='Nombre' nameID='nombre' value={body.nombre} innerRef={nombreInputEl} innerOnChange={inputChange} />

            <Input text='Apellidos' nameID='apellidos' value={body.apellidos} innerRef={apellidosInputEl} innerOnChange={inputChange} />

            <Input text='Número de celular' type='number' nameID='num_celular' value={body.num_celular} innerRef={numCelularInputEl} innerOnChange={inputChange} />

            <Select innerRef={tipoDocumentoInputEl} innerValue={body.tipo_documento} innerOnChange={selectChange} innerName='tipo_documento' value={['', 'C.C', 'C.E', 'NIT']} option={['Selecciona una opción', 'Cédula de Ciudadanía', 'Cédula de Extranjería', '(NIT) Número de Identificación Tributaria']} text='Tipo de Documento' />

            <Input text='Número de Documento' type='number' nameID='num_documento' value={body.num_documento} innerRef={numDocumentoInputEl} innerOnChange={inputChange} />

            <Input text='Correo' type='email' nameID='correo' value={body.correo} innerRef={correoInputEl} innerOnChange={inputChange} />

            <div className='input-container'>
              <Input text='Contraseña' nameID='contrasena' type={showPassword ? 'password' : 'text'} value={body.contrasena} innerRef={contrasenaInputEl} innerOnChange={inputChange} />
              <div onClick={handleShowPasswordClick}>{showPassword ? <FaEye className='eye' /> : <FaEyeSlash className='eye' />}</div>
            </div>
          </div>
          <div className='register'>
            <Button text={'Registrarse'} textDisabled='Cargando' disable={disabled} />
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
