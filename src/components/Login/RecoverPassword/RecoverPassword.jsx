import './RecoverPassword.css'

//? Components
import { Input, Button, Navbar, API_URL, validateMail } from '../../Utils'

//* Hooks
import { useEffect, useRef, useState } from 'react'

//* Library
import { ToastContainer, toast, Zoom } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

//? Icons
import { AiFillBackward } from 'react-icons/ai'

const RecoverPassword = () => {
  const navigate = useNavigate()

  //! Cambiar título de la página
  const [title, setTitle] = useState('FADEMET Montajes | Recuperar contraseña')
  useEffect(() => {
    document.title = title
  }, [setTitle])

  //? Deshabilitar botón mientras carga
  const [disabled, setDisabled] = useState(false)

  //* Función para hacer focus en el input que no cumpla con los requisitos
  const focusInput = (input) => input.current.focus()

  //* Variables para hacer la validación
  const correoInputEl = useRef(null)

  const verifyEmail = async (e) => {
    e.preventDefault()

    const correo = e.target[0].value

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
    } else {
      setBody({ correo })
      
      setDisabled(true)

      navigate('/reset-password')

      // TODO axios
      // await axios
      //   .post(API_URL('recoverpassword'), body)
      //   .then(({ data }) => {
      //     const { result } = data

      //     setSession(true)

      //     if (result) return navigate('/verify-password')
      //   })
      //   .catch(() => {
      //     toast.error('¡Correo y/o contraseña incorrectos!', {
      //       theme: 'colored'
      //     })
      //     setDisabled(false)
      //   })
    }
  }

  //* guarda correo y contraseña
  const [body, setBody] = useState({ correo: '' })

  const inputChange = ({ target }) => {
    const { name, value } = target
    setBody({
      ...body,
      [name]: value
    })
  }

  return (
    <main className='recover-password'>
      <ToastContainer transition={Zoom} limit={3} pauseOnFocusLoss={false} />
      <Navbar
        elementTextLeft={['Inicio']}
        urlLeft={['/']}
        elementTextRight={['']}
        urlRight={['']}
        renderButtons={3}
      />
      <section className='recover-password__container'>
        <div className='recover-password__card'>
          <AiFillBackward className='back-button' onClick={() => navigate(-1)} />
          <div className='container__image'>
            <img src='/recover-password-email.png' alt='Correo para recuperar la contraseña' />
          </div>
          <div className='container__title'>
            <h1>¿No recuerdas tu contraseña?</h1>
          </div>
          <div className='container__text'>
            <p>¡No te preocupes! Nos sucede a todos. Ingresa tu Email y te ayudaremos.</p>
          </div>
          <form className='container__form' onSubmit={verifyEmail}>
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
              <Button text={'Recuperar contraseña'} textDisabled={'Cargando'} disable={disabled} />
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

export { RecoverPassword }