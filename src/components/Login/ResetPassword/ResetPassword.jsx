import './ResetPassword.css'

//* Hooks
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// ? Components
import { API_URL, Button2, Input, Navbar, validatePassword } from '../../Utils'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { ToastContainer, toast, Zoom } from 'react-toastify'
import { Footer } from '../../Home/Footer/Footer'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

const ResetPassword = () => {
  const navigate = useNavigate()
  const { token } = useParams()
  const [idUsuario, setIdUsuario] = useState('')

  // * Verificar token y estado, si está inactivo redireccionar a "/" o si no tiene token
  useEffect(() => {
    const parseToken = token.replace(/-/g, '.')
    axios.post(API_URL('authToken'), { token: parseToken })
      .then(() => {
        const decode = jwtDecode(parseToken)
        const { id_usuario, estado } = decode.data[0]
        verifyState(!estado) && navigate('/')
        setIdUsuario(id_usuario)
      })
      .catch(() => {
        navigate('/')
      })
  }, [])

  const verifyState = (estado) => estado === 'inactivo'

  // ! Cambiar título de la página
  const [title, setTitle] = useState('FADEMET Montajes - Restablecer contraseña')
  useEffect(() => {
    document.title = title
  }, [setTitle])

  // ? Deshabilitar botón mientras carga
  const [disabled, setDisabled] = useState(false)

  // * Mostrar contraseña
  const [showPassword, setShowPassword] = useState(true)

  const handleShowPasswordClick = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true)
  }

  // Función para hacer focus en el input que no cumpla con los requisitos
  const focusInput = (input) => input.current.focus()

  const contrasenaInputEl = useRef(null)
  const confirmarContrasenaInputEl = useRef(null)

  const resetPassword = async (e) => {
    e.preventDefault()
    const contrasena = e.target[0].value
    const confirmarContrasena = e.target[1].value

    const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@¡!/¿?_\-*$%&=ñÑ]{8,16}$/

    if (validatePassword(contrasena, /^\s+$/)) {
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
    } else if (validatePassword(confirmarContrasena, /^\s+$/)) {
      e.preventDefault()

      toast.error('¡La contraseña no puede estar vacía!', {
        theme: 'colored'
      })

      focusInput(confirmarContrasenaInputEl)
    } else if (!validatePassword(confirmarContrasena, regexContrasena)) {
      e.preventDefault()
      toast.error(
        '¡La contraseña debe tener entre 8 y 16 caracteres, una mayúscula, una minúscula y un número!',
        {
          theme: 'colored'
        }
      )

      focusInput(confirmarContrasenaInputEl)
    } else if (contrasena !== confirmarContrasena) {
      e.preventDefault()

      toast.error('¡Las contraseñas no coinciden!', {
        theme: 'colored'
      })

      focusInput(confirmarContrasenaInputEl)
    } else {
      setBody({ contrasena })
      setDisabled(true)
      axios
        .patch(API_URL(`recuperarContrasena/${idUsuario}`), {
          contrasena: body.contrasena
        })
        .then(() => {
          navigate('/login')
          toast.success('¡Contraseña actualizada correctamente!', {
            theme: 'colored'
          })
        })
        .catch(() => {
          toast.error('¡Hubo un error al cambiar la contraseña!', {
            theme: 'colored'
          })
        })
    }
  }

  // * guarda correo y contraseña
  const [body, setBody] = useState({ contrasena: '' })

  const inputChange = ({ target }) => {
    const { name, value } = target
    setBody({
      ...body,
      [name]: value
    })
  }

  return (
    <>
      <main className='reset-password'>
        <ToastContainer transition={Zoom} limit={3} pauseOnFocusLoss={false} />
        <Navbar
          elementTextLeft={['Inicio']}
          urlLeft={['/']}
          elementTextRight={['']}
          urlRight={['']}
          renderButtons={3}
        />
        <section className='reset-password__container'>
          <div className='reset-password__card'>
            <div className='container__image'>
              <img src='/recover-password-reset.png' alt='Correo para recuperar la contraseña' />
            </div>
            <div className='container__title'>
              <h1>¡Restablece tu contraseña!</h1>
            </div>
            <div className='container__text'>
              <p>¡Es hora de renovarse! crea una nueva clave secreta.</p>
            </div>
            <form className='container__form' onSubmit={resetPassword}>
              <div className='main-form'>
                <div className='input-container'>
                  <Input
                    text='Nueva contraseña'
                    nameID='contrasena'
                    type={showPassword ? 'password' : 'text'}
                    value={body.contrasena}
                    innerRef={contrasenaInputEl}
                    innerOnChange={inputChange}
                  />
                  <div onClick={handleShowPasswordClick}>
                    {showPassword ? <FaEye className='eye' /> : <FaEyeSlash className='eye' />}
                  </div>
                </div>
                <div className='input-container'>
                  <Input
                    text='Confirmar nueva contraseña'
                    innerId='confirmarContrasena'
                    type={showPassword ? 'password' : 'text'}
                    nameID='confirmarContrasena'
                    value={body.confirmarContrasena}
                    innerRef={confirmarContrasenaInputEl}
                    innerOnChange={inputChange}
                  />
                  <div onClick={handleShowPasswordClick}>
                    {showPassword ? <FaEye className='eye' /> : <FaEyeSlash className='eye' />}
                  </div>
                </div>
                <Button2 text={'Restablecer'} textDisabled={'Cargando'} disable={disabled} />
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export { ResetPassword }
