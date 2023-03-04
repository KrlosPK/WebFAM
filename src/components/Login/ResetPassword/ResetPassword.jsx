import './ResetPassword.css'

//* Hooks
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

//? Components
import { Button, Input, Navbar, validatePassword } from '../../Utils'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { ToastContainer, toast, Zoom } from 'react-toastify'

const ResetPassword = () => {
  const navigate = useNavigate()

  //! Cambiar título de la página
  const [title, setTitle] = useState('FADEMET Montajes - Cambiar contraseña')
  useEffect(() => {
    document.title = title
  }, [setTitle])

  //? Deshabilitar botón mientras carga
  const [disabled, setDisabled] = useState(false)

  //* Mostrar contraseña
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

    const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@¡!/¿?_\-\*\$\%\&\=ñÑ]{8,16}$/

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
    } else {
      setBody({ contrasena, confirmarContrasena })

      setDisabled(true)

      navigate('/login')
    }
  }

  //* guarda correo y contraseña
  const [body, setBody] = useState({ contrasena: '', confirmarContrasena: '' })

  const inputChange = ({ target }) => {
    const { name, value } = target
    setBody({
      ...body,
      [name]: value
    })
  }

  return (
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
            <h1>¡Reestable tu contraseña!</h1>
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
              <Button text={'Verificar'} textDisabled={'Cargando'} disable={disabled} />
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

export { ResetPassword }
