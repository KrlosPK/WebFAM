import './RecoverPassword.css'

// ? Components
import { Input, Button, Navbar, API_URL, validateMail } from '../../Utils'

//* Hooks
import { useEffect, useRef, useState } from 'react'

//* Library
import { ToastContainer, toast, Zoom } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import emailjs from '@emailjs/browser'
import Swal from 'sweetalert2'

// ? Icons
import { AiFillBackward } from 'react-icons/ai'
import { Footer } from '../../Home/Footer/Footer'

const RecoverPassword = () => {
  const navigate = useNavigate()

  // ! Cambiar título de la página
  const [title, setTitle] = useState('FADEMET Montajes | Recuperar contraseña')
  useEffect(() => {
    document.title = title
  }, [setTitle])

  // ? Deshabilitar botón mientras carga
  const [disabled, setDisabled] = useState(false)

  //* Función para hacer focus en el input que no cumpla con los requisitos
  const focusInput = (input) => input.current.focus()

  //* Variables para hacer la validación
  const correoInputEl = useRef(null)

  // ? Desactivar tecla de enter
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault()
    }
  }

  // TODO
  const [toEmail, setToEmail] = useState('')

  const form = useRef(null)

  const sendEmail = () => {
    emailjs.sendForm('service_nl11uxr', 'template_wa8h19ra', form.current, '-cZX9PkvRspHkBQSX')
  }

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

      setToEmail(correo)

      // TODO axios
      await axios
        .post(API_URL('comprobarCorreo'), body)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: '¡Hemos enviado un correo a tu cuenta!',
            text: 'Entra al enlace que te hemos enviado al correo para que restablezcas tu contraseña.',
            footer: '<a href="/">Volver al inicio</a>'
          })
          sendEmail()
        })
        .catch(() => {
          toast.error('¡Este correo no está asociado a ninguna de nuestras cuentas!', {
            theme: 'colored'
          })
          setDisabled(false)
        })
    }
  }

  //* guarda correo
  const [body, setBody] = useState({ correo: '' })

  const inputChange = ({ target }) => {
    const { name, value } = target
    setBody({
      ...body,
      [name]: value
    })
  }

  return (
    <>
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
            <AiFillBackward className='back-button' onClick={() => navigate('/login')} />
            <div className='container__image'>
              <img src='/recover-password-email.png' alt='Correo para recuperar la contraseña' />
            </div>
            <div className='container__title'>
              <h1>¿No recuerdas tu contraseña?</h1>
            </div>
            <div className='container__text'>
              <p>¡No te preocupes! Nos sucede a todos. Ingresa tu Email y te ayudaremos.</p>
            </div>
            <form className='container__form' ref={form} onSubmit={verifyEmail}>
              <div className='main-form'>
                <Input
                  text='Correo electrónico'
                  innerId='correo'
                  type='email'
                  nameID='correo'
                  value={body.correo}
                  innerRef={correoInputEl}
                  innerOnChange={inputChange}
                  innerOnKeyDown={handleKeyDown}
                />
                <input
                  style={{ display: 'none' }}
                  readOnly
                  type='text'
                  id='recoverLink'
                  name='recoverLink'
                  value='https://fademetmontajes.netlify.app/reset-password'
                />
                <input
                  style={{ display: 'none' }}
                  readOnly
                  type='text'
                  id='fromName'
                  name='fromName'
                  value='FADEMET Montajes'
                />
                <input
                  style={{ display: 'none' }}
                  readOnly
                  type='text'
                  id='toEmail'
                  name='toEmail'
                  value={toEmail}
                />
                <Button
                  text={'Recuperar contraseña'}
                  textDisabled={'Enviado'}
                  disable={disabled}
                  animation={false}
                />
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export { RecoverPassword }
